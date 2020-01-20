import { ModelConstants, AliasQuery } from './../constants/model.constants';
import { BaseEntity } from './BaseEntity';
import { Repository, ObjectLiteral, Connection, Brackets, JoinOptions } from "typeorm";

export interface DeepQueryOptions<T> {
    firstWhere?: boolean;
    andWhere?: DeepQueryOptions<T>;
    orWhere?: DeepQueryOptions<T>;
    whereAttribute?: WhereOptions<T>;
}

export interface WhereOptions<T> {
    equals: T;
    moreThan: T;
    moreThanE: T;
    lessThan: T;
    lessThanE: T;
}

export class BaseRepository<T extends BaseEntity<U>, U extends ObjectLiteral> extends Repository<T> {
    constructor(
        public readonly connection: Connection
    ) {
        super();
    }

    getRepository(entity: string) {
        return this.connection.getRepository(entity);
    }

    get models() {
        return ModelConstants;
    }

    async getById(id: number): Promise<T> {
        return this.findOne({ where: { id } });
    }

    async getByOptions(options: U, optionsJoin?: string[]): Promise<T[]> {
        return !optionsJoin ?
            this.find({ where: options }) :
            this.find({ where: options, join: this.getJoinQuery(optionsJoin) });
    }

    async getOneByOptions(options: U, optionsJoin?: string[]): Promise<T> {
        return !optionsJoin ?
            this.findOne({ where: options }) :
            this.findOne({ where: options, join: this.getJoinQuery(optionsJoin) });
    }

    getJoinQuery(optionsJoin: string[]) {
        let opts = {} as JoinOptions;
        opts.alias = AliasQuery;
        opts.leftJoinAndSelect = {};
        optionsJoin.map(opt => {
            opts.leftJoinAndSelect[opt] = `${opts.alias}.${opt}`
        })
        return opts;
    }

    getDeepQuery(options: DeepQueryOptions<T>) {
        const queryBuilder = this.createQueryBuilder('alias');
        if (options.firstWhere) {
            queryBuilder.where("");
        }
    }

    getOptionsWhere(options: DeepQueryOptions<T>) {
        Object.keys(options).map(key => {
            if (key == 'andWhere') {

            }
        })
    }
}