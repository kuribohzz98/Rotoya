import {
    isMainThread,
    workerData,
    parentPort
} from 'worker_threads';

export class BaseWorkerChild {
    private _workerData: any;

    constructor() {
        this._workerData = workerData;
        this.init();
    }

    init() {
    }

    get WorkerData() {
        return this._workerData;
    }

    get isMainThread() {
        return isMainThread;
    }

    dataExit(dataExit) {
        parentPort.postMessage(dataExit);
        this.done();
    }

    async done() {
        await this.onDestroy();
        process.exit(1);
    }

    async onDestroy() {

    }
}