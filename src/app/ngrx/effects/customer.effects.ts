import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { authAction } from '../actions/auth.actions';
import { customerAction } from '../actions/customer.actions';

@Injectable()
export class CustomerEffects {
  public saveCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authAction.getCustomer, authAction.loginCustomer),
      map((action) => {
        return customerAction.saveCustomer({ customer: action.customer });
      })
    );
  });
  constructor(private actions$: Actions) {}
}
