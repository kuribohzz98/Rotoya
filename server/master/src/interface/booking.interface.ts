import { PaymentAttribute } from './attribute.interface';
import { StatusCheckTimeSlot } from './../constants/book.constants';

export interface BookData {
    timeSlotId: number;
    bookingDate: number;
    price: number;
}

export interface BookSportGround {
    id?: string;
    userId: number;
    sportCenterId: number;
    bookDatas: BookData[];
    equipments?: any[];
}

export interface OutputCheckTimeSlot {
    id: number;
    status: StatusCheckTimeSlot;
    bookDate: string;
}

export interface SubjectError {
    id: string;
    timeSlotId?: number;
    done?: boolean;
}

export interface BookSubject {
    id: string;
    data?: PaymentAttribute;
    error?: SubjectError;
}