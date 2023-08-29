import { CustomerAction } from './customer-action.model';

export interface RemoveAddressAction extends CustomerAction {
  addressId: string;
}
