import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Customer } from '@app/auth/models/customer.model';
import { authAction } from '@app/ngrx/actions/auth.actions';

import { LocalStorageAuthData } from '../models/authLocalStorage.model';
import { GetAccessTokenResponse, GetUSerTokens } from '../models/getTokens.model';
import { SignInResult } from '../models/signInResult.model';
import { CustomerDraft } from '../models/customer-draft.model';

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

    return this.http.post<GetUSerTokens>(
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

  public signUp(body: CustomerDraft): Observable<SignInResult> {
    return this.http.post<SignInResult>(
      `${environment.CTP_API_URL}/${environment.CTP_PROJECT_KEY}/customers`,
      body,
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

  public setAuthDataToLocalStorage(refreshToken: string): void {
    const twoHundreedDaysInMs = 200 * 86400 * 1000;
    const refreshExpiresIn = new Date().getTime() + twoHundreedDaysInMs;

    localStorage.setItem(
      'authData',
      JSON.stringify({
        refreshToken,
        refreshTokenExp: refreshExpiresIn,
      })
    );
  }

  public autoLogin(localStorageAuthStr: string | null): void {
    if (localStorageAuthStr) {
      const localStorageAuthData: LocalStorageAuthData = JSON.parse(localStorageAuthStr);
      const currentTime = new Date().getTime();

      if (localStorageAuthData.refreshTokenExp > currentTime) {
        this.store.dispatch(authAction.autoLoginStart(localStorageAuthData));

        return;
      }
    }

    this.store.dispatch(authAction.getToken());
  }
}
