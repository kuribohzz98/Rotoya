import { PaymentAttribute } from './../interface/attribute.interface';
import { PaymentRepository } from './../repository/payment.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
    constructor(
        public readonly paymentRepository: PaymentRepository
    ) { }

    async insertPayment(paymentAttribute: PaymentAttribute) {
        return this.paymentRepository.insert(paymentAttribute);
    }

    
}
