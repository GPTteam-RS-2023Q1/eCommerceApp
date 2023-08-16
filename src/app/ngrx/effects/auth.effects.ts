import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, exhaustMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { Router } from '@angular/router';
import { authAction } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  public getToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authAction.getToken),
      exhaustMap(() =>
        this.authService.getAccessToken().pipe(
          map((response) => {
            return authAction.tokenSuccess({
              accessToken: response.access_token,
            });
          }),
          catchError((err) =>
            of(authAction.authFail({ errorMessage: err.error.message }))
          )
        )
      )
    );
  });

  public getCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authAction.loginStart),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((response) => {
            return authAction.getCustomerId({
              customerId: response.customer.id,
              email: action.email,
              password: action.password,
            });
          }),
          catchError((err) =>
            of(authAction.authFail({ errorMessage: err.error.message }))
          )
        )
      )
    );
  });

  public login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authAction.getCustomerId),
      exhaustMap((action) =>
        this.authService.GetUserTokens(action.email, action.password).pipe(
          map((response) => {
            return authAction.loginSuccess({
              accessToken: response.access_token,
              refreshToken: response.refresh_token,
            });
          }),
          catchError(() => of())
        )
      )
    );
  });

  public redirectOnLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authAction.loginSuccess),
        tap(() => {
          this.router.navigate(['store']);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
