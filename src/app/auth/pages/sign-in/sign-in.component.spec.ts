import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from '@app/auth/pages/sign-in/sign-in.component';
import { AuthModule } from '@app/auth/auth.module';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  const initialState = {
    accessToken: null,
    refreshToken: null,
    errorMessage: null,
    customerId: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthModule],
      providers: [provideMockStore({ initialState })],
    });
    TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
