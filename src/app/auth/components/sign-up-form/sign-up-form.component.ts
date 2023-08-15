import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

import { birthdayValidator } from '@app/auth/validators/birthday-validator';

@Component({
  selector: 'ec-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent implements OnInit {
  public form!: FormGroup;

  constructor(private readonly fb: NonNullableFormBuilder) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      password: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [null, birthdayValidator],
      address: {
        country: '',
        city: '',
        street: '',
        postalCode: '',
      },
    });
    this.form.valueChanges.subscribe(() => {
      console.log();
    });
  }

  public onSubmit(): void {}
}
