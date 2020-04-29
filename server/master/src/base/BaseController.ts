import { ObjectLiteral } from 'typeorm';
import { BaseService } from "./BaseService";
import { cloneFilterObject, cloneGetObject } from '../helper/utils/common';

/** 
 * @param S Service extends BaseService<R, E, A>
 * @param Q Swagger
 * @param D DTO extends ObjectLiteral
*/
export abstract class BaseController<
    S extends BaseService,
    Q extends ObjectLiteral = any,
    D extends ObjectLiteral = any
    >{

    constructor(
        private readonly localService: S
    ) { }

    protected async getBase(query: Q): Promise<D[] | [D[], number]> {
        const dataGet = cloneFilterObject(query, ['page', 'limit', 'sort', 'sortType', 'count']);
        const page = cloneGetObject(query, ['page', 'limit', 'sort', 'sortType', 'count']);
        const data = await this.localService.get(dataGet, page);
        return data;
    }

    protected async getOneBase(id: number): Promise<D> {
        const data = await this.localService.getById(+id);
        return data;
    }

    protected async createBase(body: Q): Promise<{ message: string }> {
        try {
            const dataCreate = cloneFilterObject(body, ['id']);
            await this.localService.create(dataCreate);
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

    abstract async get(query: Q): Promise<D[] | [D[], number]>;
    abstract async getOne(id: number): Promise<D>;
    abstract async create(query: Q): Promise<{ message: string }>;
    abstract async put(body: Q): Promise<{ message: string }>;
    abstract async delete(id: number): Promise<{ message: string }>;
}