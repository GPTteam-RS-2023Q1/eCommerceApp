import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from '@app/auth/models/customer.model';
import { COUNTRIES } from '@app/consts/country-data';
import { selectCustomer } from '@app/ngrx/selectors/customer.selector';
import { UserAddress } from '@app/user/models/user-address.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TuiStatus } from '@taiga-ui/kit/types/status';

@Component({
  selector: 'ec-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAddressComponent implements OnInit, OnDestroy {
  public customer$ = this.store.select(selectCustomer);
  private sub = new Subscription();
  public readonly columns = ['Country', 'City', 'Street', 'PostalCode', 'tags'];
  public countires = Object.values(COUNTRIES);
  public addresses!: UserAddress[];

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.sub.add(
      this.customer$.subscribe((customer) => {
        this.addresses = this.defineTagsForAddresses(customer);
      })
    );
  }

  public findCountyNameByTag(countryTag: string): string {
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

  public getTagColor(tag: string): TuiStatus {
    switch (tag) {
      case 'default shipping address':
        return 'primary';
      case 'default billing address':
        return 'error';
      case 'shipping address':
        return 'warning';
      default:
        return 'success';
    }
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
