import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { authAction } from '@app/ngrx/actions/auth.actions';
import { BaseUserProfileDialog } from '../baseUserProfileDialog';

@Component({
  selector: 'ec-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordDialogComponent extends BaseUserProfileDialog implements OnInit {
  constructor(private injector: Injector) {
    super(injector);
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: [''],
      newPassword: [''],
    });
  }

  public ok(): void {
    this.isLoading = true;
    this.uppdateCustomerService
      .changePassword(this.form.value.oldPassword, this.form.value.newPassword)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.store.dispatch(
            authAction.loginCustomer({
              customer: response,
              email: response.email,
              password: this.form.value.newPassword,
            })
          );
          this.context.completeWith(true);
        },
        error: (err) => {
          this.onError(err);
        },
      });
  }
}
