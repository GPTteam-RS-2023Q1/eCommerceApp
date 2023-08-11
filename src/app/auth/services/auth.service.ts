import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { authAction } from '@app/ngrx/actions/auth.actions';
import { GetAccessTokenResponse, GetUSerTokens } from '../models/getTokens.model';
import { SignInResult } from '../models/signInResult.model';
import { Customer } from '../models/customer.modet';
import { LocalStorageAuthData } from '../models/authLocalStorage.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}

  public getAccessToken(): Observable<GetAccessTokenResponse> {
    let httpParams = new HttpParams().set('grant_type', 'client_credentials');
    httpParams = httpParams.append('scope', environment.CTP_SCOPES); // TODO change scopes to only view products

    return this.http.post<GetUSerTokens>(
      `${environment.CTP_AUTH_URL}/oauth/token`,
      {},
      {
        headers: new HttpHeaders({
          Authorization: `Basic ${window.btoa(
            `${environment.CTP_CLIENT_ID}:${environment.CTP_CLIENT_SECRET}`
          )}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        params: httpParams,
      }
    );
  }

  public GetUserTokens(email: string, password: string): Observable<GetUSerTokens> {
    const httpParams = new HttpParams()
      .set('grant_type', 'password')
      .append('username', email)
      .append('password', password)
      .append('scope', environment.CTP_SCOPES);

    return this.http
      .post<GetUSerTokens>(
        `${environment.CTP_AUTH_URL}/oauth/${environment.CTP_PROJECT_KEY}/customers/token`,
        {},
        {
          headers: new HttpHeaders({
            Authorization: `Basic ${window.btoa(
              `${environment.CTP_CLIENT_ID}:${environment.CTP_CLIENT_SECRET}`
            )}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
          params: httpParams,
        }
      )
      .pipe(
        tap((response) => {
          const customerId = response.scope.slice(response.scope.lastIndexOf(':') + 1);
          this.setAuthDataToLocalStorage(response, customerId);
        })
      );
  }

  public login(email: string, password: string): Observable<SignInResult> {
    return this.http.post<SignInResult>(
      `${environment.CTP_API_URL}/${environment.CTP_PROJECT_KEY}/login`,
      { email, password },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  public getCustomer(customerId: string): Observable<Customer> {
    return this.http.get<Customer>(
      `${environment.CTP_API_URL}/${environment.CTP_PROJECT_KEY}/customers/${customerId}`
    );
  }

  public refreshToken(refreshToken: string): Observable<GetAccessTokenResponse> {
    let httpParams = new HttpParams().set('grant_type', 'refresh_token');
    httpParams = httpParams.append('refresh_token', refreshToken); // TODO change scopes to only view products

    return this.http.post<GetUSerTokens>(
      `${environment.CTP_AUTH_URL}/oauth/token`,
      {},
      {
        headers: new HttpHeaders({
          Authorization: `Basic ${window.btoa(
            `${environment.CTP_CLIENT_ID}:${environment.CTP_CLIENT_SECRET}`
          )}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        params: httpParams,
      }
    );
  }

  private setAuthDataToLocalStorage(response: GetUSerTokens, customerId: string): void {
    const accessExpiresIn = new Date().getTime() + response.expires_in * 1000;
    const twoHundreedDaysInMs = 200 * 86400 * 1000;
    const refreshExpiresIn = new Date().getTime() + twoHundreedDaysInMs;

    localStorage.setItem(
      'authData',
      JSON.stringify({
        customerId,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        accessTokenExp: accessExpiresIn,
        refreshTokenExp: refreshExpiresIn,
      })
    );
  }

  public autoLogin(): void {
    const localStorageAuthStr = localStorage.getItem('authData');
    if (localStorageAuthStr) {
      const localStorageAuthData: LocalStorageAuthData = JSON.parse(localStorageAuthStr);
      const currentTime = new Date().getTime();

      if (localStorageAuthData.accessTokenExp > currentTime) {
        this.store.dispatch(
          authAction.autoLoginSuccess({
            customerId: localStorageAuthData.customerId,
            accessToken: localStorageAuthData.accessToken,
            refreshToken: localStorageAuthData.refreshToken,
          })
        );
      } else if (
        localStorageAuthData.accessTokenExp < currentTime &&
        localStorageAuthData.refreshTokenExp > currentTime
      ) {
        this.refreshToken(localStorageAuthData.refreshToken).subscribe({
          next: (response) => {
            this.setAuthDataToLocalStorage(
              {
                ...response,
                refresh_token: localStorageAuthData.refreshToken,
              },
              localStorageAuthData.customerId
            );

            this.store.dispatch(
              authAction.autoLoginSuccess({
                customerId: localStorageAuthData.customerId,
                accessToken: response.access_token,
                refreshToken: localStorageAuthData.refreshToken,
              })
            );
          },
          error: () => this.store.dispatch(authAction.getToken()),
        });
      }
    } else {
      this.store.dispatch(authAction.getToken());
    }
  }
}
