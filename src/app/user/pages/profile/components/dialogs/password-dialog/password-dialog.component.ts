import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { UpdateCustomerService } from '../../../services/update-cutomer.service';

@Component({
  selector: 'ec-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordDialogComponent implements OnInit {
  public form!: FormGroup;
  public isLoading = false;
  public error = '';
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean>,
    private readonly fb: NonNullableFormBuilder,
    private readonly uppdateCustomerService: UpdateCustomerService
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: [''],
      newPassword: [''],
    });
  }

  public onErrorHandle(): void {
    this.error = '';
  }

  public ok(): void {
    console.log(this.form.value);
    this.isLoading = true;
    this.uppdateCustomerService
      .changePassword(this.form.value.oldPassword, this.form.value.newPassword)
      .subscribe({
        next: () => {
          this.isLoading = false;
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
