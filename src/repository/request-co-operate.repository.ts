import { EntityRepository } from "typeorm";
import { BaseRepository } from './../base/BaseRepository';
import { RequestCoOperateAttribute } from './../interface/attribute.interface';
import { RequestCoOperate } from '../entity/RequestCoOperate.entity';

@EntityRepository(RequestCoOperate)
export class RequestCoOperateRepository extends BaseRepository<RequestCoOperate, RequestCoOperateAttribute>  {

}