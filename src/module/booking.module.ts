import { TimeSlotRepository } from './../repository/timeslot.repository';
import { QueueModule } from './../queue/queue.module';
import { SportModule } from './sport.module';
import { BookingController } from './../controller/booking.controller';
import { BookingService } from './../service/booking.service';
import { BookingRepository } from './../repository/booking.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { PaymentModule } from './payment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingRepository, TimeSlotRepository]),
    PaymentModule,
    forwardRef(() => QueueModule),
  ],
  providers: [BookingService],
  controllers: [BookingController],
  exports: [BookingService],
})
export class BookingModule {}
