import { Injectable } from '@angular/core';

import { AddressForm } from '@app/shared/models/interfaces/address-from.model';
import * as Actions from '@app/user/models/customer-update-actions';
import { CustomerUpdateActions } from '@app/user/models/enums/customer-actions.enum';
import { Tag } from '@app/user/models/enums/tags.enum';
import { createDate } from '@app/utils/createDate';

import { CustomerBuilderService } from './customer-builder.service';

@Injectable()
export class CustomerActionBuilder {
  private readonly actions: Actions.CustomerAction[] = [];
  private setTagsDictionary: Record<Tag, CustomerUpdateActions> = {
    [Tag.defaultShippingAddress]: CustomerUpdateActions.setDefaultShippingAddress,
    [Tag.defaultBillingAddress]: CustomerUpdateActions.setDefaultBillingAddress,
    [Tag.billindAddress]: CustomerUpdateActions.addBillingAddressId,
    [Tag.shippingAddress]: CustomerUpdateActions.addShippingAddressId,
  };

  constructor(private customerBuilder: CustomerBuilderService) {}

  public addChangeEmail(email: string): CustomerActionBuilder {
    const changeEmail: Actions.ChangeEmailAction = {
      action: CustomerUpdateActions.changeEmail,
      email,
    };
    this.actions.push(changeEmail);

    return this;
  }

  public addSetFirstName(firstName: string): CustomerActionBuilder {
    const setFirstName: Actions.SetFirstNameAction = {
      action: CustomerUpdateActions.setFirstName,
      firstName,
    };
    this.actions.push(setFirstName);

    return this;
  }

  public addSetLastName(lastName: string): CustomerActionBuilder {
    const setLastName: Actions.SetLastNameAction = {
      action: CustomerUpdateActions.setLastName,
      lastName,
    };
    this.actions.push(setLastName);

    return this;
  }

  public addSetDateOfBirth(date: Date): CustomerActionBuilder {
    const setDateOfBirth: Actions.SetDateOfBirthAction = {
      action: CustomerUpdateActions.setDateOfBirth,
      dateOfBirth: createDate(date),
    };
    this.actions.push(setDateOfBirth);

    return this;
  }

  public addRemoveAddress(addressId: string): CustomerActionBuilder {
    const removeAddress: Actions.RemoveAddressAction = {
      action: CustomerUpdateActions.removeAddress,
      addressId,
    };
    this.actions.push(removeAddress);

    return this;
  }

  public addAddress(address: AddressForm): CustomerActionBuilder {
    const addAddress: Actions.AddAddressAction = {
      action: CustomerUpdateActions.addAddress,
      address: this.customerBuilder.createAddress(address),
    };
    this.actions.push(addAddress);

    return this;
  }

  public addAddressTagAction(
    action: CustomerUpdateActions,
    options?: {
      addressId?: string;
      addressKey?: string;
    }
  ): CustomerActionBuilder {
    const addAddressTag: Actions.AddressTagAction = {
      action,
      addressId: options?.addressId,
      addressKey: options?.addressKey,
    };
    this.actions.push(addAddressTag);

    return this;
  }

  public setTags(
    tags: Tag[],
    options?: {
      addressId?: string;
      addressKey?: string;
    }
  ): CustomerActionBuilder {
    tags.forEach((tag) => {
      this.addAddressTagAction(this.setTagsDictionary[tag], options);
    });

    return this;
  }

  public removeTags(
    tags: Tag[],
    options?: {
      addressId?: string;
      addressKey?: string;
    }
  ): CustomerActionBuilder {
    tags.forEach((tag) => {
      if (tag === Tag.billindAddress) {
        this.addAddressTagAction(CustomerUpdateActions.removeBillingAddressId, options);
      }

      if (tag === Tag.shippingAddress) {
        this.addAddressTagAction(CustomerUpdateActions.removeShippingAddressId, options);
      }
    });

    return this;
  }

  public addChangeAddress(
    addressId: string,
    address: AddressForm
  ): CustomerActionBuilder {
    const changeAddress: Actions.ChangeAddressAction = {
      action: CustomerUpdateActions.changeAddress,
      addressId,
      address: this.customerBuilder.createAddress(address),
    };
    this.actions.push(changeAddress);

    return this;
  }

  public getActions(): Actions.CustomerAction[] {
    const customerActions = this.actions.slice();
    this.actions.length = 0;

    return customerActions;
  }
}
