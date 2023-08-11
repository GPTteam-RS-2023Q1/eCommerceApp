import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { dateValidator } from '@app/auth/validators/date-validator';
import { emailValidator } from '@app/auth/validators/email-validator';
import { passwordValidator } from '@app/auth/validators/password-validator';

@Component({
  selector: 'ec-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent {
  public signUpForm = new FormGroup({
    email: new FormControl('', emailValidator),
    password: new FormControl('', passwordValidator),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl(null, dateValidator),
    address: new FormGroup({
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
    }),
  });

  public onSubmit(): void {}
}
