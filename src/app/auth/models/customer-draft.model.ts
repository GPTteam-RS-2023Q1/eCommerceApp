import { Address } from './address.model';
import { Customer } from './customer.model';

export interface CustomerDraft
  extends Pick<
    Customer,
    'email' | 'password' | 'firstName' | 'lastName' | 'dateOfBirth'
  > {
  defaultShippingAddress?: number;
  shippingAddresses: number[];
  defaultBillingAddress?: number;
  billingAddresses: number[];
  addresses: Omit<Address, 'id'>[];
}
