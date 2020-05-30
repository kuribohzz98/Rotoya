import { Controller, Get, Query, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TypeRequestCoOperate } from './type/request-co-operate.type';
import { RequestCoOperateService } from './../service/request-co-oprerate.service';
import { BaseController } from './../base/BaseController';

@ApiTags('Request Co-operate')
@Controller('request-co-operate')
export class RequestCoOperateController extends
    BaseController<RequestCoOperateService, TypeRequestCoOperate> {
    constructor(
        private readonly requestCoOperateService: RequestCoOperateService
    ) {
        super(requestCoOperateService);
    }

    @Get()
    async get(@Query() query: TypeRequestCoOperate) {
        const data = await this.getBase(query);
        return data;
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {
        const data = await this.getOneBase(id);
        return data;
    }

    @Post()
    async create(@Body() body: TypeRequestCoOperate) {
        const data = await this.createBase(body);
        return data;
    }

    @Put()
    async put(@Body() body: TypeRequestCoOperate) {
        const data = await this.putBase(body);
        return data;
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const data = await this.deleteBase(id);
        return data;
    }
}
