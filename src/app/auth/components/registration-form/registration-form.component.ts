import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ec-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  public registerForm = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.minLength(8)],
  });

  constructor(private readonly fb: NonNullableFormBuilder) {}
}
