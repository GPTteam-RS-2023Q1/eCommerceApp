import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { whiteSpaceValidator } from '@app/auth/validators/white-space-validator';
import { numbersValidator } from '@app/auth/validators/numbers-validator';
import { specialCharactersValidator } from '@app/auth/validators/special-characters-validator';
import { birthdayValidator } from '@app/auth/validators/birthday-validator';
import { selectCustomer } from '@app/ngrx/selectors/customer.selector';
import { Subscription } from 'rxjs';
import { TuiDay } from '@taiga-ui/cdk';
import { customerAction } from '@app/ngrx/actions/customer.actions';
import { UpdateCustomerService } from '../../../services/update-cutomer.service';
import { CustomerActionBuilder } from '../../../services/customer-action-builder.service';

@Component({
  selector: 'ec-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoDialogComponent implements OnInit, OnDestroy {
  public customer$ = this.store.select(selectCustomer);
  public form!: FormGroup;
  public isLoading = false;
  public error = '';
  public subs = new Subscription();

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean>,
    private readonly fb: NonNullableFormBuilder,
    private readonly uppdateCustomerService: UpdateCustomerService,
    private readonly store: Store,
    private readonly actionBuilder: CustomerActionBuilder
  ) {}

  public ngOnInit(): void {
    this.subs.add(
      this.customer$.subscribe((customer) => {
        this.form = this.fb.group({
          email: [customer?.email],
          firstName: [
            customer?.firstName,
            [
              Validators.required,
              whiteSpaceValidator('Name'),
              numbersValidator('Name'),
              specialCharactersValidator('Name'),
            ],
          ],
          lastName: [
            customer?.lastName,
            [
              Validators.required,
              whiteSpaceValidator('Last name'),
              numbersValidator('Last name'),
              specialCharactersValidator('Last name'),
            ],
          ],
          dateOfBirth: [null, birthdayValidator],
        });

        if (!customer?.dateOfBirth) {
          return;
        }

        const date = new Date(customer?.dateOfBirth);
        this.form.controls['dateOfBirth'].patchValue(
          new TuiDay(date.getFullYear(), date.getMonth(), date.getDate())
        );
      })
    );
  }

  public onErrorHandle(): void {
    this.error = '';
  }

  public ok(): void {
    this.isLoading = true;
    const actions = this.actionBuilder
      .addChangeEmail(this.form.value.email)
      .addSetFirstName(this.form.value.firstName)
      .addSetLastName(this.form.value.lastName)
      .addSetDateOfBirth(this.form.value.dateOfBirth.toLocalNativeDate())
      .getActions();

    this.uppdateCustomerService.updateCustomer(actions).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.store.dispatch(customerAction.saveCustomer({ customer: response }));
        this.context.completeWith(true);
      },
      error: (err) => {
        this.error = err.error.message;
      },
    });
  }

  public cancel(): void {
    this.isLoading = false;
    this.context.completeWith(false);
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
