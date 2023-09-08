import { Address } from '@app/shared/models/interfaces/address.model';

export interface Customer {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
  addresses: Address[];
  version: number;
}
