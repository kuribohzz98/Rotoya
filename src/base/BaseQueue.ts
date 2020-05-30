import { BehaviorSubject } from 'rxjs';

export abstract class BaseQueue<T> {
    constructor() {
        this.start();
    }

    queue: T[] = [];
    subject$: BehaviorSubject<T> = new BehaviorSubject<T>(null);
    
    start() {
        this.subject$.subscribe(async queueData => {
            if (!queueData) return;
            await this.handlerJobInQueue(queueData);
            this.removeJobDone();
            this.subject$.next(this.queue[0] || null);
        })
    }

    addToQueue(queueData: T) {
        this.queue.push(queueData);
        if (this.queue.length == 1) {
            this.subject$.next(this.queue[0]);
        }
    }

    removeJobDone() {
        this.queue.splice(0, 1);
    }

    abstract async handlerJobInQueue(queueData: T);
}