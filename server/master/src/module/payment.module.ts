import { PaymentController } from './../controller/payment.controller';
import { PaymentService } from './../service/payment.service';
import { PaymentRepository } from './../repository/payment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        TypeOrmModule.forFeature([PaymentRepository])
    ],
    providers: [PaymentService],
    controllers: [PaymentController],
    exports: [PaymentService]
})
export class PaymentModule { }
