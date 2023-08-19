import { Address } from './address.model';

export type AddressForm = Omit<Address, 'id'>;
