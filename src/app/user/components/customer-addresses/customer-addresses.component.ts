import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { Customer } from '@app/auth/models/customer.model';
import { COUNTRIES } from '@app/consts/country-data';
import { NotificationService } from '@app/shared/services/notofication.service';
import { Tag } from '@app/user/models/enums/tags.enum';
import { UserAddress } from '@app/user/models/user-address.model';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import { EditAddressDialogComponent } from '../dialogs/edit-address-dialog/edit-address-dialog.component';

@Component({
  selector: 'ec-customer-addresses',
  templateUrl: './customer-addresses.component.html',
  styleUrls: ['./customer-addresses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAddressesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public customer!: Customer;
  public addresses!: UserAddress[];
  private countires = Object.values(COUNTRIES);
  private subs = new Subscription();

  constructor(
    private readonly injector: Injector,
    private readonly dialogs: TuiDialogService,
    private notificationService: NotificationService
  ) {}

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

  public addAddress(): void {
    this.subs.add(
      this.dialogs
        .open<boolean>(
          new PolymorpheusComponent(EditAddressDialogComponent, this.injector),
          {
            label: 'Новый адрес',
          }
        )
        .subscribe((status) => {
          if (status) {
            this.notificationService.notify('Адрес успешно добавлен', 'success');
          }
        })
    );
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
        userAddress.tags.push(Tag.defaultShippingAddress);
      }

      if (customer.defaultBillingAddressId === id) {
        userAddress.tags.push(Tag.defaultBillingAddress);
      }

      if (customer.shippingAddressIds.some((shippingId) => shippingId === id)) {
        userAddress.tags.push(Tag.shippingAddress);
      }

      if (customer.billingAddressIds.some((billingId) => billingId === id)) {
        userAddress.tags.push(Tag.billindAddress);
      }

      return userAddress;
    });

    return userAddresses;
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
