import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { whiteSpaceValidator } from '@app/auth/validators/white-space-validator';
import { numbersValidator } from '@app/auth/validators/numbers-validator';
import { specialCharactersValidator } from '@app/auth/validators/special-characters-validator';
import { birthdayValidator } from '@app/auth/validators/birthday-validator';
import { selectCustomer } from '@app/ngrx/selectors/customer.selector';
import { Subscription } from 'rxjs';
import { TuiDay } from '@taiga-ui/cdk';
import { BaseUserProfileDialog } from '../baseUserProfileDialog';

@Component({
  selector: 'ec-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoDialogComponent
  extends BaseUserProfileDialog
  implements OnInit, OnDestroy
{
  public customer$ = this.store.select(selectCustomer);
  public subs = new Subscription();

  constructor(private injector: Injector) {
    super(injector);
  }

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
        this.onResponse(response);
      },
      error: (err) => {
        this.onError(err);
      },
    });
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
