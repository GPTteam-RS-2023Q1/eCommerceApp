import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Inject,
  Injector,
} from '@angular/core';
import { UserAddress } from '@app/user/models/user-address.model';
import { TuiStatus } from '@taiga-ui/kit';
import { Store } from '@ngrx/store';
import { customerAction } from '@app/ngrx/actions/customer.actions';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { UpdateCustomerService } from '../../../services/update-cutomer.service';
import { CustomerActionBuilder } from '../../../services/customer-action-builder.service';
import { EditAddressDialogComponent } from '../../dialogs/edit-address-dialog/edit-address-dialog.component';

@Component({
  selector: 'ec-customer-address',
  templateUrl: './customer-address.component.html',
  styleUrls: ['./customer-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAddressComponent {
  @Input() public address!: UserAddress;

  constructor(
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    private updateCustomerService: UpdateCustomerService,
    private store: Store,
    private customerActionBuilder: CustomerActionBuilder
  ) {}

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
    this.dialogs
      .open<UserAddress>(
        new PolymorpheusComponent(EditAddressDialogComponent, this.injector),
        {
          data: this.address,
          label: 'Address Edit',
        }
      )
      .subscribe();
  }

  public remove(address: UserAddress): void {
    console.log(address);

    const action = this.customerActionBuilder.addRemoveAddress(address.id).getActions();

    this.updateCustomerService.updateCustomer(action).subscribe({
      next: (response) => {
        this.store.dispatch(customerAction.saveCustomer({ customer: response }));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
