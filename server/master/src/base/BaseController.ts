import { BaseEntity } from './BaseEntity';
import { BaseRepository } from './BaseRepository';
import { ObjectLiteral } from 'typeorm';
import { BaseService } from "./BaseService";
import { cloneFilterObject } from '../helper/utils/common';

/** 
 * @param S Service extends BaseService<R, E, A>
 * @param R Repository extends BaseRepository<E, A>
 * @param E Entity extends BaseEntity<A>
 * @param A Attribute extends ObjectLiteral
 * @param Q Swagger
 * @param D DTO extends ObjectLiteral
*/
export abstract class BaseController<
    S extends BaseService<R, E, A, D>,
    R extends BaseRepository<E, A>,
    E extends BaseEntity<A>,
    A extends ObjectLiteral,
    Q extends A = A,
    D extends ObjectLiteral = E
    >{

    constructor(
        private readonly localService: S
    ) { }

    protected async getBase(query: Q): Promise<D[]> {
        const dataGet = cloneFilterObject(query, ['page', 'limit']);
        const page = { page: query.page, limit: query.limit };
        const data = await this.localService.get(dataGet, page);
        return data;
    }

    protected async getOneBase(id: number): Promise<D> {
        const data = await this.localService.getById(+id);
        return data;
    }

    protected async createBase(body: Q): Promise<{ message: string }> {
        try {
            await this.localService.create(body);
        } catch (e) {
            console.log(e);
            return { message: 'faild' };
        }
        return { message: 'success' };
    }

    protected async putBase(body: Q): Promise<{ message: string }> {
        const dataUpdate = cloneFilterObject(body, ['id']);
        try {
            await this.localService.update(+body.id, dataUpdate);
        } catch (e) {
            console.log(e);
            return { message: 'faild' };
        }
        return { message: 'success' };
    }

    protected async deleteBase(id: number): Promise<{ message: string }> {
        try {
            await this.localService.delete(+id);
        } catch (e) {
            console.log(e);
            return { message: 'faild' };
        }
        return { message: 'success' };
    }

    abstract async get(query: Q): Promise<D[]>;
    abstract async getOne(id: number): Promise<D>;
    abstract async create(query: Q): Promise<{ message: string }>;
    abstract async put(body: Q): Promise<{ message: string }>;
    abstract async delete(id: number): Promise<{ message: string }>;
}