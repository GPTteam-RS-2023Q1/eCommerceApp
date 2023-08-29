import { CustomerAction } from './customer-action.model';

export interface SetFirstNameAction extends CustomerAction {
  firstName: string;
}
