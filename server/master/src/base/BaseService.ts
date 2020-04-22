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
    R extends BaseRepository<E, A>,
    E extends BaseEntity<A>,
    A extends ObjectLiteral,
    D extends ObjectLiteral = E
    >{

    constructor(private readonly localRepository: R) { }

    abstract mapEntityToDto(entity: E): D;

    mapEntitiesToDtos(entities: E[]): D[] {
        return entities.map(entity => this.mapEntityToDto(entity));
    }

    async get(opts?: A, page?: OptionsPaging): Promise<D[]> {
        const data = await this.localRepository.get(opts, page);
        return this.mapEntitiesToDtos(data);
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
        return this.localRepository.update(opts, entity);
    }

    async delete(id: number): Promise<DeleteResult> {
        const entity = { id: +id } as any;
        return this.localRepository.delete(entity);
    }

}