import {
  Repository,
  ObjectLiteral,
  Connection,
  JoinOptions,
  FindManyOptions,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { OptionsPaging } from './../interface/repository.interface';
import {
  ModelConstants,
  AliasQuery,
  SortType,
} from './../constants/model.constants';

export class BaseRepository<
  T extends BaseEntity<U>,
  U extends ObjectLiteral
> extends Repository<T> {
  constructor(public readonly connection: Connection) {
    super();
  }

  getRepository<E = any>(entity: string) {
    return this.connection.getRepository<E>(entity);
  }

  get models() {
    return ModelConstants;
  }

  async getByOptions(
    options: U | U[],
    optionsJoin?: string[],
    findManyOptions?: FindManyOptions<T>,
    count?: boolean,
  ): Promise<T[] | [T[], number]> {
    let findOptions = findManyOptions || ({} as FindManyOptions<T>);
    if (options) findOptions.where = options;
    if (optionsJoin) findOptions.relations = optionsJoin;
    return count ? this.findAndCount(findOptions) : this.find(findOptions);
  }

  async getOneByOptions(options: U | U[], optionsJoin?: string[]): Promise<T> {
    return !optionsJoin || !optionsJoin.length
      ? this.findOne({ where: options })
      : this.findOne({ where: options, relations: optionsJoin });
  }

  getJoinQuery(optionsJoin: string[]) {
    let opts = {} as JoinOptions;
    opts.alias = AliasQuery;
    opts.leftJoinAndSelect = {};
    optionsJoin.map(opt => {
      opts.leftJoinAndSelect[opt] = `${opts.alias}.${opt}`;
    });
    return opts;
  }

  filterOptionsPaging(opts: any) {
    if (!opts) return null;
    const filterPaging = (key, value) => {
      if (key == 'page' || key == 'limit') return undefined;
      return value;
    };
    const options = JSON.parse(JSON.stringify(opts, filterPaging));
    if (!Object.keys(options).length) return null;
    return options;
  }

  getPageOpts(opts: OptionsPaging) {
    const result = {} as any;
    if (opts.sort) {
      result.sort = {
        [opts.sort]: opts.sortType ? opts.sortType : SortType.ASC,
      };
    }
    if (!opts || !opts.limit || !opts.page) return result;
    result.take = opts.limit;
    result.skip = (opts.page - 1) * opts.limit;
    return result;
  }

  async get(
    opts?: U,
    page?: OptionsPaging,
    relations?: string[],
  ): Promise<T[] | [T[], number]> {
    const pageOpts = this.getPageOpts(page);
    return this.getByOptions(opts, relations, pageOpts, page.count);
  }

  async getById(id: number, relations?: string[]): Promise<T> {
    return this.findOne({ where: { id }, relations });
  }
}
