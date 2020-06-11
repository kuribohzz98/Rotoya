import { EUserStatus, ECoOperateStatus } from '../entity/db.type';

export interface UserAttribute {
    id?: number;
    username?: string;
    password?: string;
    type?: string;
    status?: EUserStatus;
    salt?: string;
    iterations?: number;
    isNew?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserInfoAttribute {
    id?: number;
    userId?: number;
    firstName?: string;
    lastName?: string;
    phone?: number;
    address?: string;
    gender?: string;
    email?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserMetaAttribute {
    id?: number;
    userId?: number;
    avatar?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface RoleAttribute {
    id?: number;
    name?: string;
    code?: string;
}

export interface UserRoleAttribute {
    id?: number;
    userId?: number;
    roleId?: number;
    createdAt?: Date;
}

export interface SportAttribute {
    id?: number;
    name?: string;
    code?: string;
    createdAt?: Date;
}

export interface SportCenterAttribute {
    id?: number;
    userId?: number;
    name?: string;
    code?: string;
    country?: string;
    city?: string;
    district?: string;
    commune?: string;
    address?: string;
    avatar?: string;
    latitude?: number;
    longitude?: number;
    timeOpen?: number;
    timeClose?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SportGroundAttribute {
    id?: number;
    sportCenterId?: number;
    sportId?: number;
    name?: string;
    code?: string;
    type?: string;
    avatar?: string;
    quantity?: number;
    quantityInStock?: number;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SportGroundImageAttribute {
    id?: number;
    sportGroundId?: number;
    image?: string;
    createdAt?: Date;
}

export interface SportEquipmentAttribute {
    id?: number;
    sportId?: number;
    name?: string;
    image?: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SportCenterEquipmentBookingAttribute {
    id?: number;
    sportCenterEquipmentId?: number;
    bookingId?: number;
    price?: number;
    amount?: number
}

export interface SportCenterEquipmentAttribute {
    id?: number;
    sportCenterId?: number;
    sportEquipmentId?: number;
    quantity?: number;
    price?: number;
    isDelete?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SportCenterSportAttribute {
    id?: number;
    sportCenterId?: number;
    sportId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SportGroundTimeSlotAttribute {
    id?: number;
    sportGroundId?: number;
    startTime?: number;
    endTime?: number;
    price?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface BookingAttribute {
    id?: number;
    timeSlotId?: number;
    paymentId?: number;
    bookingDate?: string;
    amount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PaymentAttribute {
    id?: number;
    userId?: number;
    sportCenterId?: number;
    amount?: number;
    currency?: string;
    orderId?: string;
    transactionId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface RequestCoOperateAttribute {
    id?: number;
    status?: ECoOperateStatus;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    city?: string;
    district?: string;
    commune?: string;
    address?: string;
    note?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SportCenterFavoriteAttribute {
    id?: number;
    sportCenterId?: number;
    userId?: number;
    createdAt?: Date;
}