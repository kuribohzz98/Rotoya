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