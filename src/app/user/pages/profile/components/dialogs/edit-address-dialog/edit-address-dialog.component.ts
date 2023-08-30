import { ChangeDetectionStrategy, Component, OnInit, Injector } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { AddressForm } from '@app/auth/models/address-from.model';
import { BaseUserProfileDialog } from '../baseUserProfileDialog';

@Component({
  selector: 'ec-edit-address-dialog',
  templateUrl: './edit-address-dialog.component.html',
  styleUrls: ['./edit-address-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAddressDialogComponent extends BaseUserProfileDialog implements OnInit {
  constructor(private injector: Injector) {
    super(injector);
  }

  public ngOnInit(): void {
    const address = this.context.data;
    this.form = this.fb.group({
      tags: [address?.tags ?? null],
      address: {
        country: address?.country ?? '',
        city: address?.city ?? '',
        streetName: address?.streetName ?? '',
        postalCode: address?.postalCode ?? '',
      },
    });
  }

  public ok(): void {
    let action;
    if (this.context.data) {
      action = this.actionBuilder
        .addChangeAddress(this.context.data.id, this.form.value.address)
        .removeTags(this.context.data.tags, { addressId: this.context.data.id })
        .setTags(this.form.value.tags, { addressId: this.context.data.id })
        .getActions();
    } else {
      const key = uuidv4();
      const address: AddressForm = {
        ...this.form.value.address,
        key,
      };
      action = this.actionBuilder
        .addAddress(address)
        .setTags(this.form.value.tags, { addressKey: key })
        .getActions();
    }

    this.isLoading = true;
    this.uppdateCustomerService.updateCustomer(action).subscribe({
      next: (response) => {
        this.onResponse(response);
      },
      error: (err) => {
        this.onError(err);
      },
    });
  }
}
