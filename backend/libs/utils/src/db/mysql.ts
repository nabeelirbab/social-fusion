import { FindOperator, In } from 'typeorm';
import { Uuid } from '@lib/utils';
export const UuidTransformer = {
  to: (value: Uuid | FindOperator<Uuid[]>) => {
    const uuid = (value as Uuid)?.uuid;
    if (uuid) return uuid;
    const operator = value as FindOperator<Uuid[]>;
    return In(operator.value.map((v) => v.uuid));
  },
  from: (value: string) => new Uuid(value),
};
