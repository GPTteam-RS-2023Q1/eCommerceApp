import { Address } from '@app/auth/models/address.model';

export interface UserAddress extends Address {
  tags: string[];
}
