import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { authAction } from '@app/ngrx/actions/auth.actions';
import { selectAuthError } from '@app/ngrx/selectors/auth.selector';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ec-auth-fail',
  templateUrl: './auth-fail.component.html',
  styleUrls: ['./auth-fail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFailComponent implements OnInit, OnDestroy {
  @Input() public parentForm!: FormGroup;

  private sub = new Subscription();

  public error$ = this.store.select(selectAuthError);

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.sub.add(
      this.parentForm.valueChanges.subscribe(() => {
        this.onClose();
      })
    );

    this.sub.add(
      this.error$.subscribe((message) => {
        if (message) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      })
    );
  }

  public onClose(): void {
    this.store.dispatch(authAction.authFail({ errorMessage: null }));
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
