import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { AuthService } from '@app/auth/services/auth.service';

import { authAction } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  public getToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authAction.getToken, authAction.logOut),
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

  public signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authAction.signUpStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.body).pipe(
          map((response) => {
            return authAction.loginCustomer({
              customer: response.customer,
              email: action.body.email,
              password: action.body.password,
            });
          }),
          catchError((err) =>
            of(authAction.authFail({ errorMessage: err.error.message }))
          )
        );
      })
    );
  });

  public login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authAction.loginStart),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((response) => {
            return authAction.loginCustomer({
              customer: response.customer,
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

  public autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authAction.autoLoginStart),
      exhaustMap((action) => {
        return this.authService.refreshToken(action.refreshToken).pipe(
          map((response) => {
            this.authService.setAuthDataToLocalStorage(action.refreshToken);
            const responseScope = response.scope.split(' ');
            const strWithCustomerId = responseScope.find((element) =>
              element.includes('customer_id')
            );

            if (!strWithCustomerId) {
              return authAction.loginSuccess({
                accessToken: response.access_token,
                refreshToken: action.refreshToken,
              });
            }

            const customerId = strWithCustomerId.split(':')[1];
            return authAction.autoLoginSuccess({
              customerId,
              accessToken: response.access_token,
              refreshToken: action.refreshToken,
            });
          }),
          catchError(() => {
            return of(authAction.getToken());
          })
        );
      })
    );
  });

  public getCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authAction.autoLoginSuccess),
      exhaustMap((action) => {
        return this.authService.getCustomer(action.customerId).pipe(
          map((response) => {
            return authAction.getCustomer({ customer: response });
          }),
          catchError(() => of())
        );
      })
    );
  });

  public getUserTokens$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authAction.loginCustomer),
      exhaustMap((action) => {
        return this.authService.GetUserTokens(action.email, action.password).pipe(
          map((response) => {
            this.authService.setAuthDataToLocalStorage(response.refresh_token);
            return authAction.loginSuccess({
              accessToken: response.access_token,
              refreshToken: response.refresh_token,
            });
          }),
          catchError(() => of())
        );
      })
    );
  });

  public getAnonymousTokens$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authAction.anonymousSessionStart),
      exhaustMap(() => {
        return this.authService.getAnonymousTokens().pipe(
          map((response) => {
            this.authService.setAuthDataToLocalStorage(response.refresh_token);
            return authAction.loginSuccess({
              accessToken: response.access_token,
              refreshToken: response.refresh_token,
            });
          }),
          catchError(() => of())
        );
      })
    );
  });

  public redirectOnLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authAction.loginSuccess),
        tap(() => {
          if (this.router.routerState.snapshot.url.includes('auth')) {
            this.router.navigate(['store']);
          }
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
