import { AddressForm } from '@app/shared/models/interfaces/address-from.model';

import { CustomerUpdateActions } from './enums/customer-actions.enum';

export interface CustomerAction {
  action: CustomerUpdateActions;
}

export interface SetLastNameAction extends CustomerAction {
  lastName: string;
}

export interface SetFirstNameAction extends CustomerAction {
  firstName: string;
}

export interface SetDateOfBirthAction extends CustomerAction {
  dateOfBirth: string;
}

export interface RemoveAddressAction extends CustomerAction {
  addressId: string;
}

export interface ChangeEmailAction extends CustomerAction {
  email: string;
}

export interface ChangeAddressAction extends CustomerAction {
  addressId: string;
  address: AddressForm;
}

export interface AddressTagAction extends CustomerAction {
  addressId?: string;
  addressKey?: string;
}

export interface AddAddressAction extends CustomerAction {
  address: AddressForm;
}
