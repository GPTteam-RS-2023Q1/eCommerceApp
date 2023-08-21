import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthModule } from '@app/auth/auth.module';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SignInFormComponent } from './sign-in-form.component';

describe('SignInFormComponent', () => {
  let component: SignInFormComponent;
  let fixture: ComponentFixture<SignInFormComponent>;

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
    fixture = TestBed.createComponent(SignInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
