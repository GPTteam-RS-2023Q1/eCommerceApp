import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { COUNTRIES } from '@app/consts/country-data';
import { UserAddress } from '@app/user/models/user-address.model';
import { TuiStatus } from '@taiga-ui/kit';
import { RemoveAddressAction } from '@app/user/models/remove-address.model';
import { CustomerUpdateActions } from '@app/user/models/enums/customer-actions.enum';
import { Store } from '@ngrx/store';
import { customerAction } from '@app/ngrx/actions/customer.actions';
import { UpdateCustomerService } from '../../../services/update-cutomer.service';

@Component({
  selector: 'ec-customer-address',
  templateUrl: './customer-address.component.html',
  styleUrls: ['./customer-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAddressComponent {
  @Input() public address!: UserAddress;
  public countires = Object.values(COUNTRIES);

  constructor(
    private updateCustomerService: UpdateCustomerService,
    private store: Store
  ) {}

  public findCountyNameByTag(countryTag: string): string {
    const counrty = this.countires.find((country) => country.tag === countryTag);
    return counrty ? counrty.name : countryTag;
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

  public editAddress(address: UserAddress): void {
    console.log(address);
  }

  public remove(address: UserAddress): void {
    console.log(address);

    const action: RemoveAddressAction = {
      action: CustomerUpdateActions.removeAddress,
      addressId: address.id,
    };

    this.updateCustomerService.updateCustomer([action]).subscribe({
      next: (response) => {
        this.store.dispatch(customerAction.saveCustomer({ customer: response }));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
