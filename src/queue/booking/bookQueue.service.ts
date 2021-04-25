import { StatusCheckTimeSlot } from './../../constants/book.constants';
import { BookingService } from './../../service/booking.service';
import { BehaviorSubject } from 'rxjs';
import {
  Injectable,
  OnModuleInit,
  Logger,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { BaseQueue } from '../../base/BaseQueue';
import { BookSportGround } from '../../interface/booking.interface';
import { GetFullDate } from '../../helper/utils/date';

// type BookQueueData<T> = {
//     new(...args): BaseQueue<T>;
// }

class BookQueueJob extends BaseQueue<BookSportGround> {
  bookingService: BookingService;

  constructor(bookingService: BookingService) {
    super();
    this.bookingService = bookingService;
  }

  async handlerJobInQueue(data: BookSportGround) {
    console.log('handlerJobInQueue', data);
    let hasError = false;
    await Promise.all(
      data.bookDatas.map(async bookData => {
        const bookDate = GetFullDate(bookData.bookingDate);
        try {
          const result = await this.bookingService.checkTimeSlot(
            bookData.timeSlotId,
            bookDate,
          );
          console.log(result, '________________');
          if (result.status == StatusCheckTimeSlot.ITS_OVER) {
            hasError = true;
            this.bookingService.errorSubject$.next({
              id: data.id,
              timeSlotId: bookData.timeSlotId,
            });
          }
        } catch (e) {
          hasError = true;
          this.bookingService.errorSubject$.next({ id: data.id });
        }
      }),
    );
    if (hasError) return;
    const paymentAttr = await this.bookingService.bookInsert(data);
    this.bookingService.bookSubject$.next({ id: data.id, data: paymentAttr });
    this.bookingService.errorSubject$.next({ id: data.id, done: true });
  }
}

interface BookQueueData {
  [key: string]: BookQueueJob;
}

@Injectable()
export class BookQueueService implements OnModuleInit {
  private logger = new Logger('BookQueueServvice');
  public subject$: BehaviorSubject<BookSportGround> = new BehaviorSubject<
    BookSportGround
  >(null);
  public bookQueue: BookQueueData = {};

  constructor(
    @Inject(forwardRef(() => BookingService))
    private readonly bookingService: BookingService,
  ) {}

  onModuleInit() {
    this.initQueue();
  }

  initQueue() {
    this.logger.log('initQueue__________');
    this.watchAddJob();
  }

  watchAddJob() {
    this.subject$.subscribe(data => {
      if (!data) return;
      if (!this.bookQueue[data.sportCenterId]) {
        const bookQueueDataTemp = new BookQueueJob(this.bookingService);
        bookQueueDataTemp.addToQueue(data);
        this.bookQueue = {
          ...this.bookQueue,
          [data.sportCenterId]: bookQueueDataTemp,
        };
        return;
      }
      this.bookQueue[data.sportCenterId].addToQueue(data);
    });
  }

  addJob(data: BookSportGround) {
    this.subject$.next(data);
  }
}
