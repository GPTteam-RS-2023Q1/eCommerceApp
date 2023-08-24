import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { COUNTRIES } from '@app/consts/country-data';
import { UserAddress } from '@app/user/models/user-address.model';
import { TuiStatus } from '@taiga-ui/kit';

@Component({
  selector: 'ec-customer-address',
  templateUrl: './customer-address.component.html',
  styleUrls: ['./customer-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAddressComponent {
  @Input() public address!: UserAddress;
  public countires = Object.values(COUNTRIES);

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
  }
}
