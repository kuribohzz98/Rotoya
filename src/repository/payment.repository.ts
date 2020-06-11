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
            return this.getByOptions(options, ['sportCenter', 'user', 'user.userInfo'], { take, skip, order: { createdAt: 'DESC' } }, opts.count);
        }
        return this.getByOptions(options, ['sportCenter', 'user', 'user.userInfo'], { order: { createdAt: 'DESC' } }, opts.count);
    }

    async getPaymentInfo(orderId: string) {
        const payment = this.models.payment;
        const booking = this.models.booking;
        const timeSlot = this.models.sport_ground_time_slot;
        const sportCenter = this.models.sport_center;
        const sportGround = this.models.sport_ground;
        //todo
        const sce_booking = this.models.sport_center_equipment_booking;
        const sce = this.models.sport_center_equipment;
        const sportEquipment = this.models.sport_equipment;
        const user = this.models.user;
        const user_info = this.models.user_info;
        return this.createQueryBuilder(payment)
            .leftJoinAndMapMany(`${payment}.bookings`, booking, booking, `${booking}.paymentId = ${payment}.id`)
            .leftJoinAndMapMany(`${booking}.sportCenterEquipmentBookings`, sce_booking, sce_booking, `${booking}.id = ${sce_booking}.bookingId`)
            .leftJoinAndMapOne(`${sce_booking}.sportCenterEquipment`, sce, sce, `${sce}.id = ${sce_booking}.sportCenterEquipmentId`)
            .leftJoinAndMapOne(`${payment}.user`, user, user, `${user}.id = ${payment}.userId`)
            .leftJoinAndMapOne(`${user}.userInfo`, user_info, user_info, `${user}.id = ${user_info}.userId`)
            .leftJoinAndMapOne(`${sce}.sportEquipment`, sportEquipment, sportEquipment, `${sportEquipment}.id = ${sce}.sportEquipmentId`)
            .leftJoinAndMapOne(`${payment}.sportCenter`, sportCenter, sportCenter, `${payment}.sportCenterId = ${sportCenter}.id`)
            .leftJoinAndMapOne(`${booking}.sportGroundTimeSlot`, timeSlot, timeSlot, `${timeSlot}.id = ${booking}.timeSlotId`)
            .leftJoinAndMapOne(`${timeSlot}.sportGround`, sportGround, sportGround, `${sportGround}.id = ${timeSlot}.sportGroundId`)
            .where(`${payment}.orderId = :orderId`, { orderId })
            .getOne();
    }

    async getPaymentBySportCenterId(sportCenterId: number, startDate: string, endDate: string) {
        const payment = this.models.payment;
        const booking = this.models.booking;
        const timeSlot = this.models.sport_ground_time_slot;
        const sportGround = this.models.sport_ground;
        return this.createQueryBuilder(payment)
            .leftJoinAndMapMany(`${payment}.bookings`, booking, booking, `${booking}.paymentId = ${payment}.id`)
            .leftJoinAndMapOne(`${booking}.sportGroundTimeSlot`, timeSlot, timeSlot, `${timeSlot}.id = ${booking}.timeSlotId`)
            .leftJoinAndMapOne(`${timeSlot}.sportGround`, sportGround, sportGround, `${sportGround}.id = ${timeSlot}.sportGroundId`)
            .where(`${payment}.sportCenterId = :sportCenterId`, { sportCenterId })
            .andWhere(`${booking}.bookingDate BETWEEN :startDate AND :endDate`, { startDate, endDate })
            .getMany();
    }

    async getPaymentByTimeSlotId(timeSlotId: number, bookingDate: string) {
        const payment = this.models.payment;
        const booking = this.models.booking;
        const user = this.models.user;
        const userInfo = this.models.user_info;
        return this.createQueryBuilder(payment)
            .leftJoinAndMapMany(`${payment}.bookings`, booking, booking, `${booking}.paymentId = ${payment}.id`)
            .leftJoinAndMapOne(`${payment}.user`, user, user, `${user}.id = ${payment}.userId`)
            .leftJoinAndMapOne(`${user}.userInfo`, userInfo, userInfo, `${user}.id = ${userInfo}.userId`)
            .where(`${booking}.timeSlotId = :timeSlotId`, { timeSlotId })
            .andWhere(`${booking}.bookingDate LIKE :bookingDate`, { bookingDate: bookingDate + '%' })
            .getMany();
    }
}