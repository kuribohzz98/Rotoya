import { Payment } from './../entity/Payment.entity';
import { PaymentAttribute } from './../interface/attribute.interface';
import { BaseRepository } from './../base/BaseRepository';
import { EntityRepository } from "typeorm";

@EntityRepository(Payment)
export class PaymentRepository extends BaseRepository<Payment, PaymentAttribute>  {
    
}