import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { authAction } from '@app/ngrx/actions/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ec-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormComponent implements OnInit {
  public form!: FormGroup;

  constructor(private readonly fb: NonNullableFormBuilder, private store: Store) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });

    this.form.valueChanges.subscribe(() => {
      this.store.dispatch(authAction.authFail({ errorMessage: null }));
    });
  }

  public onSubmit(): void {
    this.store.dispatch(
      authAction.loginStart({
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value,
      })
    );
  }
}
