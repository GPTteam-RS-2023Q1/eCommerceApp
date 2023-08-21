import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { authAction } from '@app/ngrx/actions/auth.actions';
import { AuthState } from '@app/ngrx/state.model';
import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { GetAccessTokenResponse } from '../models/getTokens.model';
import { LocalStorageAuthData } from '../models/authLocalStorage.model';

describe('AuthService', () => {
  let service: AuthService;
  let store: MockStore;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

  const initialState = {
    accessToken: null,
    refreshToken: null,
    errorMessage: null,
    customerId: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({ initialState })],
    });

    service = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable with a GetAccessTokenResponse object', () => {
    const authService = new AuthService(httpClientSpy, store);
    const expectedResponse: GetAccessTokenResponse = {
      access_token: 'access_token',
      token_type: 'token_type',
      expires_in: 123,
      scope: 'scope',
    };
    httpClientSpy.post.and.returnValue(of(expectedResponse));
    authService.getAccessToken().subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });
});

describe('AuthService autologin', () => {
  let store: MockStore<AuthState>;
  let service: AuthService;

  const initialState = {
    accessToken: null,
    refreshToken: null,
    errorMessage: null,
    customerId: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({ initialState })],
    });

    service = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
  });

  it('no user data in local Storage', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const expectedAction = authAction.getToken;
    service.autoLogin(null);
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction());
  });

  it('refresh token expired', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const localStorageAuthStr = JSON.stringify({
      refreshToken: 'test2',
      refreshTokenExp: new Date().getTime() - 1000,
    });
    const expectedAction = authAction.getToken;
    service.autoLogin(localStorageAuthStr);
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction());
  });

  it('refresh token not expired', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const localStorageAuthStr = JSON.stringify({
      refreshToken: 'test2',
      refreshTokenExp: new Date().getTime() + 10000,
    });
    const expectedAction = authAction.autoLoginStart;
    service.autoLogin(localStorageAuthStr);
    const localStorageAuthData: LocalStorageAuthData = JSON.parse(localStorageAuthStr);
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction(localStorageAuthData));
  });
});
