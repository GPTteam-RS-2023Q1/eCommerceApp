import { CustomerAction } from './customer-action.model';

export interface AddressTagAction extends CustomerAction {
  addressId?: string;
  addressKey?: string;
}
