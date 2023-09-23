import { TuiDay } from '@taiga-ui/cdk';

import { AddressForm } from '../../shared/models/interfaces/address-from.model';

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: TuiDay;
  matchForms: boolean;
  shippingAddress: AddressForm;
  billingAddress: AddressForm;
  defaultShippingAddress: boolean;
  defaultBillingAddress: boolean;
}
