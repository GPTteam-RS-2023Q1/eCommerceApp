import { Address } from '@app/auth/models/address.model';
import { Tag } from './enums/tags.enum';

export interface UserAddress extends Address {
  tags: Tag[];
}
