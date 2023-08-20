import { Injectable } from '@angular/core';

import { AddressForm } from '@app/auth/models/address-from.model';
import { CustomerDraft } from '@app/auth/models/customer-draft.model';
import { COUNTRIES } from '@app/consts/country-data';
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
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  private setAddresses(
    billingAddress: AddressForm,
    shippingAddress: AddressForm
  ): AddressForm[] {
    const addresses = [this.createAddress(shippingAddress)];

    if (!compareObjects(shippingAddress, billingAddress)) {
      addresses.push(this.createAddress(billingAddress));
    }

    return addresses;
  }

  private setCountry(country: string): string {
    return COUNTRIES[country].tag;
  }

  private createAddress(address: AddressForm): AddressForm {
    return { ...address, country: this.setCountry(address.country) };
  }
}
