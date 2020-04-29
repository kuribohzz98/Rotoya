import { Injectable, Inject, forwardRef, Logger } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import * as uuid from 'uuid/v4';
import { filter, take } from 'rxjs/operators';
import { TimeSlotRepository } from './../repository/timeslot.repository';
import { BookQueueService } from './../queue/booking/bookQueue.service';
import { ConfigService } from './../config/config.service';
import { BookingAttribute, PaymentAttribute } from './../interface/attribute.interface';
import { BookSportGround, OutputCheckTimeSlot, SubjectError, BookSubject } from './../interface/booking.interface';
import { BookingRepository } from './../repository/booking.repository';
import { GetFullDate } from '../helper/utils/date';
import { PaymentService } from './payment.service';
import { StatusCheckTimeSlot, TimeOutBook } from '../constants/book.constants';

@Injectable()
export class BookingService{
    public bookSubject$: Subject<BookSubject>;
    public errorSubject$: Subject<SubjectError>;
    private logger = new Logger('BookingService');

    constructor(
        public readonly bookingRepository: BookingRepository,
        public readonly configService: ConfigService,
        public readonly paymentService: PaymentService,
        @Inject(forwardRef(() => BookQueueService))
        public readonly bookQueueService: BookQueueService,
        public readonly timeSlotRepository: TimeSlotRepository
    ) {
        this.bookSubject$ = new Subject<BookSubject>();
        this.errorSubject$ = new Subject<SubjectError>();
    }

    bookSportGround$(book: BookSportGround): Observable<any> {
        const uuidv4 = uuid();
        if (!book.userId || !book.bookDatas || !book.bookDatas.length) return;
        const result$ = new Subject<any>();
        book.id = uuidv4;
        this.bookQueueService.addJob(book);
        this.errorSubject$.pipe(
            filter(data => data && data.id == uuidv4),
            take(1)
        ).subscribe(errorData => {
            this.logger.log(errorData, 'BookingService: errorSubject');
            if (errorData.done) return;
            if (!errorData.timeSlotId) return this.bookSubject$.next({ id: uuidv4, error: {} as SubjectError });
            this.bookSubject$.next({ id: uuidv4, error: errorData });
        })
        this.bookSubject$.pipe(
            filter(data => data && data.id == uuidv4),
            take(1)
        ).subscribe(data => {
            this.logger.log(data, 'BookingService: bookSubject');
            if (!data.error) {
                this.addTimeOutBook(data.data.orderId);
                return result$.next({ id: uuidv4, message: 'complete', data: data.data });
            }
            if (data.error && !data.error.id) return result$.next({ id: uuidv4, error: 'There was an error' });
            return result$.next({ id: uuidv4, error: data.error.timeSlotId });
        });
        return result$.pipe(filter(data => data && data.id == uuidv4), take(1));
    }

    addTimeOutBook(orderId: string): void {
        const callback = () => this.paymentService.rollBackBooking(orderId);
        const timeout = setTimeout(callback, TimeOutBook);
        this.paymentService.schedule.addTimeout(orderId, timeout);
    }

    async checkTimeSlot(id: number, bookDate: string): Promise<OutputCheckTimeSlot> {
        const result = {} as OutputCheckTimeSlot;
        result.id = +id;
        result.bookDate = bookDate;
        const timeSlot = await this.timeSlotRepository.getOneByOptions({id: +id}, ['sportGround']);
        if (!timeSlot) throw new Error('timeSlot not found');
        const booked = await this.bookingRepository.getByOptions({timeSlotId: +id, bookingDate: bookDate});
        const slotBooked = !booked ? 0 : booked.length;
        if (timeSlot.sportGround.quantity <= slotBooked) {
            result.status = StatusCheckTimeSlot.ITS_OVER;
            return result;
        }
        result.status = StatusCheckTimeSlot.STILL_EMPTY;
        return result;
    }

    async bookInsert(book: BookSportGround): Promise<PaymentAttribute> {
        const paymentAttribute = {} as PaymentAttribute;
        paymentAttribute.userId = book.userId;
        paymentAttribute.sportCenterId = book.sportCenterId;
        paymentAttribute.amount = book.bookDatas.reduce((preValue, bookData) => preValue + +bookData.price, 0);
        paymentAttribute.orderId = uuid();
        const insertPayment = await this.paymentService.insertPayment(paymentAttribute);
        const bookAttrs = book.bookDatas.map(bookData => {
            const bookAttribute = {} as BookingAttribute;
            bookAttribute.timeSlotId = bookData.timeSlotId;
            bookAttribute.paymentId = insertPayment.identifiers[0].id;
            bookAttribute.bookingDate = GetFullDate(bookData.bookingDate);
            return bookAttribute;
        })
        await this.bookingRepository.insert(bookAttrs);
        paymentAttribute.id = insertPayment.identifiers[0].id;
        return paymentAttribute;
    }
}