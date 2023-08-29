import { CustomerAction } from './customer-action.model';

export interface SetDateOfBirthAction extends CustomerAction {
  dateOfBirth: string;
}
