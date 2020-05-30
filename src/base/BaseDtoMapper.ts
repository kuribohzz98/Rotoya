import _ = require('lodash');

export type MapperFunction<A = any, B = any> = (data: A, prop: string) => B;

export type MapperClass = { new(...args): any };

export const SIMPLE_DTO_MAPPER_FN: MapperFunction = (val) => val;

export const getFromFn = (propKey: string | MapperFunction) => (model: any, prop) => deepFind(model, propKey || prop);

export function deepFind(obj, path) {
  let paths = path.split('.')
    , current = obj
    , i;

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
}

export class ValueMappingFailedError extends Error {
    constructor(reason: string) {
        super(`Failed to map value: ${reason}`);
        Error.captureStackTrace(this);
    }
}

export interface MapperProp {
    mapper: MapperFunction | MapperClass;
    fromFn: MapperFunction;
    propKey: string;
    multiple: boolean;
    defaultVal?: any;
}

export interface MapperProps {
    [key: string]: MapperProp;
}

export class DtoMapper<DTOAttributes = any> {
    protected mapperProps: MapperProps;

    constructor(data?: DTOAttributes) {
        // init prop own
        this.mapping(data);
    }

    protected mapping(data: any): any {
        if (!data) {
            return;
        }
        this.addOwnProp();

        if (this.mapperProps) {
            for (const prop of Object.keys(this.mapperProps)) {
                if (this[prop] instanceof DtoMapper) {//support deep mapping
                    this.mappingChild(this, data, prop);
                    continue;
                }
                const value = this.getDataFromSource(data, this.mapperProps[prop]);
                if (typeof value != 'undefined') {
                    this[prop] = value;
                }
            }
        }
    }

    mappingChild(object, data: any, prop: any): any {
        const value = this.getDataFromSource(data, this.mapperProps[prop]);
        if (typeof object[prop] != 'undefined') {
            object[prop].from(value);
        }
    }

    addOwnProp(): any {
        //Todo
        // for (const key in this) {
        //     if (!this.mapperProps[key]) {
        //         this.mapperProps[key] = key;
        //     }
        // }
    }

    private getDataFromSource(data: any, prop: MapperProp, ...agh): any {
        const preValue = prop.fromFn(data, prop.propKey);
        let rawValue = !_.isUndefined(preValue) ? preValue : prop.defaultVal;

        // if( !prop.multiple && _.isEmpty(preValue) ) {
        //     rawValue = prop.defaultVal;
        // }

        if (_.isObject(rawValue) && _.isEmpty(rawValue) && prop.multiple) {
            return rawValue;
        }

        const value = prop.multiple ? this.mapMultipleValue(rawValue, prop.mapper) : this.mapValue(rawValue, prop.mapper);
        if (typeof value == 'undefined') {
            return value;
        }

        return value;
    }

    private mapMultipleValue(value, mapper: MapperFunction | MapperClass) {
        if (_.isArray(value)) {
            return value.map(val => this.mapValue(val, mapper));
        } else if (_.isObject(value)) {
            return _.mapValues(value, val => this.mapValue(val, mapper));
        }
        return this.mapValue(value, mapper);
    }

    private mapValue(value: any, mapper: MapperFunction | MapperClass) {
        try {
            if (this.isClass(mapper)) {
                return new (<MapperClass>mapper)(value);
            } else if (_.isFunction(mapper)) {
                return (<Function>mapper)(value);
            }
        } catch (e) {
            throw new ValueMappingFailedError(e.message);
        }
    }

    private isClass(fn: any) {
        return /^\s*class/.test(fn.toString());
    }

    public __from__(data: any) {
        this.mapping(data);
    }
}

export function MapFrom(fromProp?: string | MapperFunction, mapper?: MapperFunction | MapperClass, multiple?: boolean, defaultVal?: any) {
    return function (target, propKey: string) {
        if (!target.mapperProps) {
            target.mapperProps = {};
        }
        mapper = mapper ? mapper : SIMPLE_DTO_MAPPER_FN;
        fromProp = fromProp ? fromProp : propKey;
        const fromFn = _.isFunction(fromProp) ? fromProp : getFromFn(fromProp)
        multiple = multiple ? true : false;
        target.mapperProps[propKey] = { mapper, fromFn, propKey, multiple, defaultVal };
    }
}

export interface IDtoMapper<T = any> {
    new(source: T): IDtoMapper<T>;
}

// export function MappedDto(target: any) {
//     // save a reference to the original constructor
//     var original = target;

//     // the new constructor behaviour
//     var f: any = function (...args) {
//         const instance = new original(args);
//         if (instance.mapperProps) {
//             const mapper = new DtoMapper();
//             mapper['mapperProps'] = instance.mapperProps;
//             mapper.__from__(args[0]);
//             Object.assign(instance, mapper);
//             delete instance.mapperProps;
//         }
//         return instance;
//     }

//     // copy prototype so intanceof operator still works
//     f.prototype = original.prototype;

//     // return new constructor (will override original)
//     return f;
// }
