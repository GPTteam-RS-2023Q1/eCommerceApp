import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { authAction } from '@app/ngrx/actions/auth.actions';
import { AuthState } from '@app/ngrx/state.model';
import { EMPTY, of } from 'rxjs';
import { AppComponent } from '@app/app.component';
import { AuthService } from './auth.service';
import { GetAccessTokenResponse } from '../models/getTokens.model';

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
  let component: AppComponent;
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
    component = new AppComponent(service);
  });

  it('should call autoLogin when ngOnInit', () => {
    const spy = spyOn(service, 'autoLogin').and.callFake(() => {
      return EMPTY;
    });

    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('no user data in local Storage', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const expectedAction = authAction.getToken;
    service.autoLogin(null);
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction());
  });

  it('access token not expired', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const expectedAction = authAction.autoLoginSuccess;
    const localStorageAuthStr = JSON.stringify({
      customerId: 'test',
      accessToken: 'test1',
      refreshToken: 'test2',
      accessTokenExp: new Date().getTime() + 172800 * 1000,
      refreshTokenExp: 2,
    });
    service.autoLogin(localStorageAuthStr);
    expect(dispatchSpy).toHaveBeenCalledWith(
      expectedAction({ customerId: 'test', accessToken: 'test1', refreshToken: 'test2' })
    );
  });

  it('access token expired but refrest token not', () => {
    const spy = spyOn(service, 'refreshToken').and.callFake(() => {
      return EMPTY;
    });
    const localStorageAuthStr = JSON.stringify({
      customerId: 'test',
      accessToken: 'test1',
      refreshToken: 'test2',
      accessTokenExp: 1,
      refreshTokenExp: new Date().getTime() + 172800 * 1000,
    });
    service.autoLogin(localStorageAuthStr);
    expect(spy).toHaveBeenCalled();
  });
});
