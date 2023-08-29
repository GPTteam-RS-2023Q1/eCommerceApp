import { CustomerAction } from './customer-action.model';

export interface ChangeEmailAction extends CustomerAction {
  email: string;
}
