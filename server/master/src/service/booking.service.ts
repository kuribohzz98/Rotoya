import { OptionsPaging } from './../interface/repository.interface';
import { ConfigService } from './../config/config.service';
import { BookingAttribute, PaymentAttribute } from './../interface/attribute.interface';
import { BookSportGround } from './../interface/booking.interface';
import { BookingRepository } from './../repository/booking.repository';
import { Injectable } from '@nestjs/common';
import { GetFullDate } from '../helper/utils/date';
import { createQrCodeAndSave } from '../helper/tools/file';
import { PaymentService } from './payment.service';

@Injectable()
export class BookingService {
    constructor(
        public readonly bookingRepository: BookingRepository,
        public readonly configService: ConfigService,
        public readonly paymentService: PaymentService
    ) { }

    async bookSportGround(book: BookSportGround) {
        const bookAttribute = {} as BookingAttribute;
        bookAttribute.userId = book.userId;
        bookAttribute.sportGroundId = book.sportGroundId;
        bookAttribute.timeSlotId = book.timeSlotId;
        bookAttribute.equipment = book.equipment ? JSON.stringify(book.equipment) : null;
        bookAttribute.bookingDate = GetFullDate(book.bookingDate);
        const insertBook = await this.bookingRepository.insert(bookAttribute);
        const paymentAttribute = {} as PaymentAttribute;
        const { fileName, dataBase64 } = await createQrCodeAndSave(this.configService.get('path_qrcode'), "{hihi: 'hihi'}");
        paymentAttribute.bookingId = insertBook.identifiers[0].id;
        paymentAttribute.qrCode = fileName;
        paymentAttribute.amount = 0;
        await this.paymentService.insertPayment(paymentAttribute);
        return dataBase64;
    }

    async getBookingByUser(userId: number, options?: OptionsPaging) {
        return this.bookingRepository.getBookingByUserHasPaging(userId, options);
    }

    async getPayment(id: number) {

    }

    // async createQrCode(): Promise<string> {
    //     return createQrCodeAndSave(this.configService.get('path_qrcode'), "{hihi: 'hihi'}");
    // }
}