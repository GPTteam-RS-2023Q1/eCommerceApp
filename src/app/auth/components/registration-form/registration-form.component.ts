import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

import { emailValidator } from '@app/auth/validators/email-validator';
import { passwordValidator } from '@app/auth/validators/password-validator';

@Component({
  selector: 'ec-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  public registerForm = this.fb.group({
    email: ['', emailValidator],
    password: ['', passwordValidator],
  });

  constructor(private readonly fb: NonNullableFormBuilder) {}
}
