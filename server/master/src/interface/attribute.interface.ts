import { EUserStatus } from '../entity/db.type';

export interface UserAttribute {
    id?: number;
    username?: string;
    password?: string;
    type?: string;
    status?: EUserStatus;
    salt?: string;
    iterations?: number;
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

export interface SportCentreAttribute {
    id?: number;
    userId?: number;
    name?: string;
    code?: string;
    country?: string;
    city?: string;
    district?: string;
    commune?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SportGroundAttribute {
    id?: number;
    sportCentreId?: number;
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

export interface SportEquipmentAttribute {
    id?: number;
    sportCentreId?: number;
    name?: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SportGroundEquipmentAttribute {
    id?: number;
    sportEquipmentId?: number;
    sportGroundId?: number;
    quantity?: number;
    createdAt?: Date;
    updatedAt?: Date;
}