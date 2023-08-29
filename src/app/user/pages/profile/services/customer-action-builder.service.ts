import { Injectable } from '@angular/core';
import { ChangeEmailAction } from '@app/user/models/change-email.modet';
import { CustomerAction } from '@app/user/models/customer-action.model';
import { CustomerUpdateActions } from '@app/user/models/enums/customer-actions.enum';
import { RemoveAddressAction } from '@app/user/models/remove-address.model';
import { SetDateOfBirthAction } from '@app/user/models/set-date-of-birth.model';
import { SetFirstNameAction } from '@app/user/models/set-first-name.model';
import { SetLastNameAction } from '@app/user/models/set-last-name.model';
import { createDate } from '@app/utils/createDate';

@Injectable()
export class CustomerActionBuilder {
  private readonly actions: CustomerAction[] = [];

  public addChangeEmail(email: string): CustomerActionBuilder {
    const changeEmail: ChangeEmailAction = {
      action: CustomerUpdateActions.changeEmail,
      email,
    };
    this.actions.push(changeEmail);

    return this;
  }

  public addSetFirstName(firstName: string): CustomerActionBuilder {
    const setFirstName: SetFirstNameAction = {
      action: CustomerUpdateActions.setFirstName,
      firstName,
    };
    this.actions.push(setFirstName);

    return this;
  }

  public addSetLastName(lastName: string): CustomerActionBuilder {
    const setLastName: SetLastNameAction = {
      action: CustomerUpdateActions.setLastName,
      lastName,
    };
    this.actions.push(setLastName);

    return this;
  }

  public addSetDateOfBirth(date: Date): CustomerActionBuilder {
    const setDateOfBirth: SetDateOfBirthAction = {
      action: CustomerUpdateActions.setDateOfBirth,
      dateOfBirth: createDate(date),
    };
    this.actions.push(setDateOfBirth);

    return this;
  }

  public addRemoveAddress(addressId: string): CustomerActionBuilder {
    const removeAddress: RemoveAddressAction = {
      action: CustomerUpdateActions.removeAddress,
      addressId,
    };
    this.actions.push(removeAddress);

    return this;
  }

  public getActions(): CustomerAction[] {
    const customerActions = this.actions.slice();
    this.actions.length = 0;
    return customerActions;
  }
}
