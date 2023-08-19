import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { authAction } from '@app/ngrx/actions/auth.actions';

@Component({
  selector: 'ec-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormComponent implements OnInit, OnDestroy {
  public form!: FormGroup;

  private valueChangesSub = new Subscription();

  constructor(private readonly fb: NonNullableFormBuilder, private store: Store) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });

    this.valueChangesSub.add(
      this.form.valueChanges.subscribe(() => {
        this.store.dispatch(authAction.authFail({ errorMessage: null }));
      })
    );
  }

  public onSubmit(): void {
    this.store.dispatch(
      authAction.loginStart({
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value,
      })
    );
  }

  public ngOnDestroy(): void {
    this.valueChangesSub.unsubscribe();
  }
}
