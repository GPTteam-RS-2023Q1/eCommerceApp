import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { customerAction } from '@app/ngrx/actions/customer.actions';
import { NotificationService } from '@app/shared/services/notofication.service';
import { Tag } from '@app/user/models/enums/tags.enum';
import { UserAddress } from '@app/user/models/user-address.model';
import { TuiDialogService } from '@taiga-ui/core';
import { TuiStatus } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import { CustomerActionBuilder } from '../../../services/customer-action-builder.service';
import { UpdateCustomerService } from '../../../services/update-cutomer.service';
import { EditAddressDialogComponent } from '../../dialogs/edit-address-dialog/edit-address-dialog.component';

@Component({
  selector: 'ec-customer-address',
  templateUrl: './customer-address.component.html',
  styleUrls: ['./customer-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAddressComponent implements OnDestroy {
  @Input() public address!: UserAddress;
  private subs = new Subscription();

  constructor(
    private readonly injector: Injector,
    private readonly dialogs: TuiDialogService,
    private updateCustomerService: UpdateCustomerService,
    private store: Store,
    private customerActionBuilder: CustomerActionBuilder,
    private notificationService: NotificationService
  ) {}

  public getTagColor(tag: string): TuiStatus {
    switch (tag) {
      case Tag.defaultShippingAddress:
        return 'primary';
      case Tag.defaultBillingAddress:
        return 'error';
      case Tag.shippingAddress:
        return 'warning';
      default:
        return 'success';
    }
  }

  public editAddress(): void {
    this.subs.add(
      this.dialogs
        .open<boolean>(
          new PolymorpheusComponent(EditAddressDialogComponent, this.injector),
          {
            data: this.address,
            label: 'Редактирование адреса',
          }
        )
        .subscribe((status) => {
          if (status) {
            this.notificationService.notify('Адрес изменен', 'success');
          }
        })
    );
  }

  public remove(address: UserAddress): void {
    const action = this.customerActionBuilder.addRemoveAddress(address.id).getActions();

    this.updateCustomerService.updateCustomer(action).subscribe({
      next: (response) => {
        this.store.dispatch(customerAction.saveCustomer({ customer: response }));
        this.notificationService.notify('Адрес удален', 'success');
      },
    });
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
