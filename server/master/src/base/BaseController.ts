import { BaseEntity } from './BaseEntity';
import { BaseRepository } from './BaseRepository';
import { Delete, Param, Get, Post, Put, Query, Body } from "@nestjs/common";
import { ObjectLiteral } from 'typeorm';
import { BaseService } from "./BaseService";
import { cloneFilterObject } from 'src/helper/utils/common';

/** 
 * @param S Service extends BaseService<R, E, A>
 * @param R Repository extends BaseRepository<E, A>
 * @param E Entity extends BaseEntity<A>
 * @param A Attribute extends ObjectLiteral
 * @param D DTO extends ObjectLiteral
*/
export class BaseController<
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

    @Get()
    async get(@Query() query: Q) {
        const dataGet = cloneFilterObject(query, ['page', 'limit']);
        const page = { page: query.page, limit: query.limit };
        const data = await this.localService.get(dataGet, page);
        return data;
    }

    @Get(':id')
    async getOne(@Param() id: number) {
        const data = await this.localService.getById(+id);
        return data;
    }

    @Post()
    async post(@Body() body: Q) {
        try {
            await this.localService.create(body);
        } catch (e) {
            console.log(e);
            return {'message': 'faild'};
        }
        return {'message': 'success'};
    }

    @Put()
    async put(@Body() body: Q) {
        const dataUpdate = cloneFilterObject(body, ['id']);
        const data = await this.localService.update(+body.id, dataUpdate);
        return data;
    }

    @Delete(':id')
    async delete(@Param() id: number) {
        try {
            await this.localService.delete(+id);
        } catch (e) {
            console.log(e);
            return {'message': 'faild'};
        }
        return {'message': 'success'};
    }
}