import { ObjectLiteral } from 'typeorm';

export class BaseEntity<T extends ObjectLiteral> {
  attribute: T;
}
