import { Injectable } from '@angular/core';

import { AddressForm } from '@app/auth/models/address-from.model';
import { CustomerDraft } from '@app/auth/models/customer-draft.model';
import { compareObjects } from '@app/utils/compareObjects';

interface CreateCustomerParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  billingAddress: AddressForm;
  shippingAddress: AddressForm;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerBuilderService {
  private customer: CustomerDraft = {} as CustomerDraft;

  public createCustomer(params: CreateCustomerParams): CustomerBuilderService {
    const addresses = this.setAddresses(params.billingAddress, params.shippingAddress);

    const customer = {
      email: params.email,
      password: params.password,
      firstName: params.firstName,
      lastName: params.lastName,
      dateOfBirth: this.createDate(params.dateOfBirth),
      addresses,
      billingAddresses: [this.getAddressIndex(params.billingAddress, addresses)],
      shippingAddresses: [this.getAddressIndex(params.shippingAddress, addresses)],
    };

    this.customer = customer;

    return this;
  }

  public withDefaultBillingAddress(): CustomerBuilderService {
    this.customer = {
      ...this.customer,
      defaultBillingAddress: this.customer.billingAddresses[0],
    };

    return this;
  }

  public withDefaultShippingAddress(): CustomerBuilderService {
    this.customer = {
      ...this.customer,
      defaultShippingAddress: this.customer.shippingAddresses[0],
    };

    return this;
  }

  public getCustomer(): CustomerDraft {
    return this.customer;
  }

  private getAddressIndex(
    address: AddressForm,
    addresses: AddressForm[] = this.customer.addresses
  ): number {
    return addresses.includes(address) ? addresses.indexOf(address) : 0;
  }

  private createDate(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  private setAddresses(
    billingAddress: AddressForm,
    shippingAddress: AddressForm
  ): AddressForm[] {
    const addresses = [shippingAddress];

    if (!compareObjects(shippingAddress, billingAddress)) {
      addresses.push(billingAddress);
    }

    return addresses;
  }
}
