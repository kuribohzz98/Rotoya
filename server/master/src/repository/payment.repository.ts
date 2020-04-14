import { Payment } from './../entity/Payment.entity';
import { PaymentAttribute } from './../interface/attribute.interface';
import { BaseRepository } from './../base/BaseRepository';
import { EntityRepository } from "typeorm";
import { OptionsQueryPayment } from '../interface/payment.interface';

@EntityRepository(Payment)
export class PaymentRepository extends BaseRepository<Payment, PaymentAttribute>  {
    async getPaymentByOrderId(orderId: string) {
        return this.findOne({
            where: { orderId },
            relations: ['bookings']
        })
    }

    async getPayments(opts?: OptionsQueryPayment) {
        const options = this.filterOptionsPaging(opts);
        if (opts && opts.page && opts.limit) {
            const take = opts.limit;
            const skip = opts.limit * (opts.page - 1);
            return this.getByOptions(options, ['sportCenter'], { take, skip, order: { createdAt: 'DESC' } });
        }
        return this.getByOptions(options, ['sportCenter']);
    }

    async getPaymentInfo(orderId: string) {
        const payment = this.models.payment;
        const booking = this.models.booking;
        const timeSlot = this.models.sport_ground_time_slot;
        const sportCenter = this.models.sport_center;
        const sportGround = this.models.sport_ground;
        return this.createQueryBuilder(payment)
            .leftJoinAndMapMany(`${payment}.bookings`, booking, booking, `${booking}.paymentId = ${payment}.id`)
            .leftJoinAndMapOne(`${payment}.sportCenter`, sportCenter, sportCenter, `${payment}.sportCenterId = ${sportCenter}.id`)
            .leftJoinAndMapOne(`${booking}.sportGroundTimeSlot`, timeSlot, timeSlot, `${timeSlot}.id = ${booking}.timeSlotId`)
            .leftJoinAndMapOne(`${timeSlot}.sportGround`, sportGround, sportGround, `${sportGround}.id = ${timeSlot}.sportGroundId`)
            .where(`${payment}.orderId = :orderId`, { orderId })
            .getOne();
    }
}