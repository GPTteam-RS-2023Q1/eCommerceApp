import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserAddress } from '@app/user/models/user-address.model';
import { UpdateCustomerService } from '../../../services/update-cutomer.service';

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
    private readonly store: Store
  ) {}

  public ngOnInit(): void {
    const address = this.context.data;
    this.form = this.fb.group({
      tags: [address.tags],
      address: {
        country: address.country,
        city: address.city,
        streetName: address.streetName,
        postalCode: address.postalCode,
      },
    });
  }

  public onErrorHandle(): void {
    this.error = '';
  }

  public ok(): void {
    console.log(this.form);
  }

  public cancel(): void {
    this.isLoading = false;
    this.context.completeWith(false);
  }
}
