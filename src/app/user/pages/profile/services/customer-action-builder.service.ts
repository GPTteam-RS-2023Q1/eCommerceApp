import { Injectable } from '@angular/core';
import { AddressForm } from '@app/auth/models/address-from.model';
import { ChangeEmailAction } from '@app/user/models/customer-update-actions/change-email.modet';
import { CustomerAction } from '@app/user/models/customer-update-actions/customer-action.model';
import { CustomerUpdateActions } from '@app/user/models/enums/customer-actions.enum';
import { RemoveAddressAction } from '@app/user/models/customer-update-actions/remove-address.model';
import { SetDateOfBirthAction } from '@app/user/models/customer-update-actions/set-date-of-birth.model';
import { SetFirstNameAction } from '@app/user/models/customer-update-actions/set-first-name.model';
import { SetLastNameAction } from '@app/user/models/customer-update-actions/set-last-name.model';
import { createDate } from '@app/utils/createDate';
import { ChangeAddressAction } from '@app/user/models/customer-update-actions/change-address.model';
import { AddAddressAction } from '@app/user/models/customer-update-actions/add-address.model';

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

  public addAddress(address: AddressForm): CustomerActionBuilder {
    const addAddress: AddAddressAction = {
      action: CustomerUpdateActions.addAddress,
      address,
    };
    this.actions.push(addAddress);

    return this;
  }

  public addChangeAddress(
    addressId: string,
    address: AddressForm
  ): CustomerActionBuilder {
    const changeAddress: ChangeAddressAction = {
      action: CustomerUpdateActions.changeAddress,
      addressId,
      address,
    };
    this.actions.push(changeAddress);

    return this;
  }

  public getActions(): CustomerAction[] {
    const customerActions = this.actions.slice();
    this.actions.length = 0;
    return customerActions;
  }
}
