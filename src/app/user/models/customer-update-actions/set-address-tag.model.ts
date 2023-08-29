import { CustomerAction } from './customer-action.model';

export interface SetAddressTagAction extends CustomerAction {
  addressId?: string;
  addressKey?: string;
}
