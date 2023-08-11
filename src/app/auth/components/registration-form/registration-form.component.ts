import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { dateValidator } from '@app/auth/validators/date-validator';
import { emailValidator } from '@app/auth/validators/email-validator';
import { passwordValidator } from '@app/auth/validators/password-validator';

@Component({
  selector: 'ec-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent implements OnInit {
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

  public ngOnInit(): void {
    this.log();
  }

  private log(): void {
    this.signUpForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  public onSubmit(): void {}
}
