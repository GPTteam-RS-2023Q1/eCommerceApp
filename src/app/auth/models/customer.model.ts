import { Address } from './address.model';

export interface Customer {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  defaultBillingAddressId: string;
  defaultShippingAddressID: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
  addresses: Address[];
}