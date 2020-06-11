import { ObjectLiteral, UpdateResult, DeleteResult } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { BaseRepository } from './BaseRepository';
import { OptionsPaging } from './../interface/repository.interface';

/** 
 * @param R Repository extends BaseRepository<E, A>
 * @param E Entity extends BaseEntity<A>
 * @param A Attribute extends ObjectLiteral
 * @param D DTO extends ObjectLiteral
*/
export abstract class BaseService<
    R extends BaseRepository<E, A> = any,
    E extends BaseEntity<A> = any,
    A extends ObjectLiteral = any,
    D extends ObjectLiteral = E
    >{

    constructor(private readonly localRepository: R) { }

    abstract mapEntityToDto(entity: E): D;

    mapEntitiesToDtos(entities: E[] | [E[], number], count?: boolean): D[] | [D[], number] {
        if (count) return [(entities[0] as E[]).map(entity => this.mapEntityToDto(entity)), entities[1] as number];
        return (entities as E[]).map(entity => this.mapEntityToDto(entity));
    }

    async get(opts?: A, page?: OptionsPaging): Promise<D[] | [D[], number]> {
        const data = await this.localRepository.get(opts, page);
        return this.mapEntitiesToDtos(data, page.count);
    }

    async getById(id: number): Promise<D> {
        const data = await this.localRepository.getById(+id);
        return this.mapEntityToDto(data);
    }

    async create(entites: A): Promise<E> {
        return this.localRepository.save(entites);
    }

    async update(id: number, opts: A): Promise<UpdateResult> {
        const entity = { id: +id } as any;
        return this.localRepository.update(entity, opts);
    }

    async delete(id: number): Promise<DeleteResult> {
        const entity = { id: +id } as any;
        return this.localRepository.delete(entity);
    }

    async createMany(entites: A[]): Promise<E[]> {
        return this.localRepository.save(entites);
    }
}