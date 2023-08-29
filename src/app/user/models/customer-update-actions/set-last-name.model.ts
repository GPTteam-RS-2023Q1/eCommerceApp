import { CustomerAction } from './customer-action.model';

export interface SetLastNameAction extends CustomerAction {
  lastName: string;
}
