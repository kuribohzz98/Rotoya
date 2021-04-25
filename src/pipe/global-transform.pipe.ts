import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { isObject } from '../helper/utils/common';

@Injectable()
export class GlobalTransfromPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (
      metadata.type == 'body' ||
      (metadata.type == 'query' && isObject(value))
    ) {
      const result = { ...value };
      Object.keys(value).map(key => {
        if (result[key] == 'true') result[key] = true;
        if (result[key] == 'false') result[key] = false;
      });
      return result;
    }
    return value;
  }
}
