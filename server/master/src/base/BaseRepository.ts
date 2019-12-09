import { BaseEntity } from './BaseEntity';
import { Repository, ObjectLiteral, Connection } from "typeorm";

export class BaseRepository<T extends BaseEntity<U>, U extends ObjectLiteral> extends Repository<T> {
    constructor(
        public readonly connection: Connection
    ) {
        super();
    }

    getRepository(entity: string) {
        return this.connection.getRepository(entity);
    }

    async getById(id: number): Promise<T> {
        return this.findOne({ where: { id } });
    }

    async getByOptions(options: U): Promise<T[]> {
        return this.find({ where: options });
    }

    async getOneByOptions(options: U): Promise<T> {
        return this.findOne({ where: options });
    }
}