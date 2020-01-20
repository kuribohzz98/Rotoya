import {
    Worker,
    isMainThread,
    MessageChannel
} from 'worker_threads';
import { TypeWorkerData } from './../interface/type.interface';
const { port1, port2 } = new MessageChannel();
import * as path from 'path';

export type TypeFilePathChild = {
    __dirname: string;
    __path: string;
}

export abstract class BaseWorker<T = any> {
    private _filePathChild: string;
    public _workerData: T;

    constructor(data?: T) {
        this._filePathChild = this.initPath();
        this._workerData = data;
        this.init();
    }

    abstract filePathChild(): TypeFilePathChild;

    async init() {
        this.inMainThread();
    }

    private initPath() {
        const file_path = path.basename(this.filePathChild().__path);
        return path.resolve(this.filePathChild().__dirname, file_path.split('.').join('Child.'));
    }

    async inMainThread() {
        if (!isMainThread) return;
        const worker = new Worker(__dirname + '/WorkerSwitch.js', { workerData: this.initWorkerData() });
        worker.on('message', message => this.mainThreadHandlerChildWorkerPostMessage(message, worker));
        worker.on('error', error => console.log(error));
        worker.once('exit', this.handlerExit.bind(this));
    }

    protected initWorkerData(): TypeWorkerData<T> {
        return {
            path: this._filePathChild,
            data: this._workerData
        };
    }

    private handlerExit(exitCode: number) {
        if (exitCode != 0) {
            console.log(`Worker stopped with exit code ${exitCode}`)
        }
    }

    async finalData() {
        return new Promise((resolve, reject) => {
            port1.on('message', message => resolve(message));
        })
    }

    mainThreadHandlerChildWorkerPostMessage(message, worker: Worker) {
        port2.postMessage(message);
    }
}

