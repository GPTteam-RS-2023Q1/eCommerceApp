import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TuiNotificationModule } from '@taiga-ui/core';
import { AuthFailComponent } from './auth-fail.component';

describe('AuthFailComponent', () => {
  let component: AuthFailComponent;
  let fixture: ComponentFixture<AuthFailComponent>;

  const initialState = {
    accessToken: null,
    refreshToken: null,
    errorMessage: null,
    customerId: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthFailComponent],
      imports: [TuiNotificationModule],
      providers: [provideMockStore({ initialState })],
    });
    TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AuthFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
