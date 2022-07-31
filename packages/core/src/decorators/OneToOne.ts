import { ReferenceType } from '../enums';
import type { OneToManyOptions } from './OneToMany';
import { createOneToDecorator } from './OneToMany';
import type { AnyString, EntityName } from '../typings';

export function OneToOne<T, O>(
  entity?: OneToOneOptions<T, O> | string | ((e?: any) => EntityName<T>),
  mappedBy?: (string & keyof T) | ((e: T) => any),
  options: Partial<OneToOneOptions<T, O>> = {},
) {
  return createOneToDecorator<T, O>(entity as string, mappedBy, options, ReferenceType.ONE_TO_ONE);
}

export interface OneToOneOptions<T, O> extends Partial<Omit<OneToManyOptions<T, O>, 'orderBy'>> {
  owner?: boolean;
  inversedBy?: (string & keyof T) | ((e: T) => any);
  wrappedReference?: boolean;
  primary?: boolean;
  mapToPk?: boolean;
  onDelete?: 'cascade' | 'no action' | 'set null' | 'set default' | AnyString;
  onUpdateIntegrity?: 'cascade' | 'no action' | 'set null' | 'set default' | AnyString;
}
