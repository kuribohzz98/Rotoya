import { SportModule } from './../module/sport.module';
import { BookQueueService } from './booking/bookQueue.service';
import { BookingModule } from './../module/booking.module';
import { Module, forwardRef } from '@nestjs/common';

@Module({
  imports: [SportModule, forwardRef(() => BookingModule)],
  providers: [BookQueueService],
  exports: [BookQueueService],
})
export class QueueModule {}
