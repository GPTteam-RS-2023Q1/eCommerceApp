import { Injector } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserAddress } from '@app/user/models/user-address.model';
import { Customer } from '@app/auth/models/customer.model';
import { customerAction } from '@app/ngrx/actions/customer.actions';
import { UpdateCustomerService } from '../../services/update-cutomer.service';
import { CustomerActionBuilder } from '../../services/customer-action-builder.service';

export class BaseUserProfileDialog {
  protected readonly context: TuiDialogContext<boolean, UserAddress>;
  protected readonly fb: NonNullableFormBuilder;
  protected readonly uppdateCustomerService: UpdateCustomerService;
  protected readonly store: Store;
  protected readonly actionBuilder: CustomerActionBuilder;

  public form!: FormGroup;
  public isLoading = false;
  public error = '';

  constructor(private InjectorObj: Injector) {
    this.context = <TuiDialogContext<boolean, UserAddress>>(
      this.InjectorObj.get(POLYMORPHEUS_CONTEXT)
    );
    this.fb = this.InjectorObj.get(NonNullableFormBuilder);
    this.uppdateCustomerService = this.InjectorObj.get(UpdateCustomerService);
    this.store = this.InjectorObj.get(Store);
    this.actionBuilder = this.InjectorObj.get(CustomerActionBuilder);
  }

  public cancel(): void {
    this.isLoading = false;
    this.context.completeWith(false);
  }

  public onErrorHandle(): void {
    this.error = '';
  }

  protected onResponse(response: Customer): void {
    this.isLoading = false;
    this.store.dispatch(customerAction.saveCustomer({ customer: response }));
    this.context.completeWith(true);
  }

  protected onError(err: any): void {
    this.isLoading = false;
    this.error = err.error.message;
  }
}
