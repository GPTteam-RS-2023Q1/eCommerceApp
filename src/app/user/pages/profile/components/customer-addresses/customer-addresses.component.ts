import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnChanges,
} from '@angular/core';
import { Customer } from '@app/auth/models/customer.model';
import { COUNTRIES } from '@app/consts/country-data';
import { UserAddress } from '@app/user/models/user-address.model';

@Component({
  selector: 'ec-customer-addresses',
  templateUrl: './customer-addresses.component.html',
  styleUrls: ['./customer-addresses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAddressesComponent implements OnInit, OnChanges {
  @Input() public customer!: Customer;
  public addresses!: UserAddress[];
  private countires = Object.values(COUNTRIES);

  public ngOnInit(): void {
    this.addresses = this.defineTagsForAddresses(this.customer);
  }

  public ngOnChanges(): void {
    this.addresses = this.defineTagsForAddresses(this.customer);
  }

  private findCountyNameByTag(countryTag: string): string {
    const counrty = this.countires.find((country) => country.tag === countryTag);
    return counrty ? counrty.name : countryTag;
  }

  public defineTagsForAddresses(customer: Customer | null): UserAddress[] {
    if (!customer || !customer.addresses) {
      return [];
    }

    const { addresses } = customer;

    const userAddresses: UserAddress[] = addresses.map((address) => {
      const userAddress: UserAddress = {
        ...address,
        tags: [],
      };
      const { id } = address;

      userAddress.country = this.findCountyNameByTag(address.country);

      if (customer.defaultShippingAddressId === id) {
        userAddress.tags.push('default shipping address');
      }

      if (customer.defaultBillingAddressId === id) {
        userAddress.tags.push('default billing address');
      }

      if (customer.shippingAddressIds.some((shippingId) => shippingId === id)) {
        userAddress.tags.push('shipping address');
      }

      if (customer.billingAddressIds.some((billingId) => billingId === id)) {
        userAddress.tags.push('billing address');
      }

      return userAddress;
    });

    return userAddresses;
  }
}
