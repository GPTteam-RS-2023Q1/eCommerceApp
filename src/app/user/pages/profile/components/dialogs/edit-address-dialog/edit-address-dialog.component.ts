import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserAddress } from '@app/user/models/user-address.model';
import { customerAction } from '@app/ngrx/actions/customer.actions';
import { UpdateCustomerService } from '../../../services/update-cutomer.service';
import { CustomerActionBuilder } from '../../../services/customer-action-builder.service';

@Component({
  selector: 'ec-edit-address-dialog',
  templateUrl: './edit-address-dialog.component.html',
  styleUrls: ['./edit-address-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAddressDialogComponent implements OnInit {
  public form!: FormGroup;
  public isLoading = false;
  public error = '';

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, UserAddress>,
    private readonly fb: NonNullableFormBuilder,
    private readonly uppdateCustomerService: UpdateCustomerService,
    private readonly store: Store,
    private readonly actionBuilder: CustomerActionBuilder
  ) {}

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

  public onErrorHandle(): void {
    this.error = '';
  }

  public ok(): void {
    console.log(this.form);
    let action;
    if (this.context.data) {
      action = this.actionBuilder
        .addChangeAddress(this.context.data.id, this.form.value.address)
        .removeTags(this.context.data.tags, this.context.data.id)
        .setTags(this.form.value.tags, this.context.data.id)
        .getActions();
    } else {
      action = this.actionBuilder
        .addAddress(this.form.value.address)
        .setTags(this.form.value.tags)
        .getActions();
    }

    console.log(action);
    this.isLoading = true;
    this.uppdateCustomerService.updateCustomer(action).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.store.dispatch(customerAction.saveCustomer({ customer: response }));
        this.context.completeWith(true);
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error.message;
      },
    });
  }

  public cancel(): void {
    this.isLoading = false;
    this.context.completeWith(false);
  }
}
