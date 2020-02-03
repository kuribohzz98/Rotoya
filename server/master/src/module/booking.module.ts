import { BookingController } from './../controller/booking.controller';
import { BookingService } from './../service/booking.service';
import { BookingRepository } from './../repository/booking.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PaymentModule } from './payment.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([BookingRepository]),
        PaymentModule
    ],
    providers: [BookingService],
    controllers: [BookingController],
    exports: [BookingService]
})
export class BookingModule { }
