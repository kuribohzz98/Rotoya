import { Role } from './../entity/Role.entity';
import { RoleAttribute } from './../interface/attribute.interface';
import { BaseRepository } from './../base/BaseRepository';
import { EntityRepository } from 'typeorm';

@EntityRepository(Role)
export class RoleRepository extends BaseRepository<Role, RoleAttribute> {}
