import { Address } from '@app/shared/models/interfaces/address.model';

import { Tag } from './enums/tags.enum';

export interface UserAddress extends Address {
  tags: Tag[];
}
