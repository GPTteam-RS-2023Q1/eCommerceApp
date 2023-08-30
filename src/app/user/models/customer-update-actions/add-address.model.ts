import { AddressForm } from '@app/auth/models/address-from.model';
import { CustomerAction } from './customer-action.model';

export interface AddAddressAction extends CustomerAction {
  address: AddressForm;
}
