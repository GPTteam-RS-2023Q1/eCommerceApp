import { AddressForm } from '@app/auth/models/address-from.model';
import { CustomerAction } from './customer-action.model';

export interface ChangeAddressAction extends CustomerAction {
  addressId: string;
  address: AddressForm;
}
