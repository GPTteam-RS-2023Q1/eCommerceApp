import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthModule } from '@app/auth/auth.module';
import { provideMockStore } from '@ngrx/store/testing';
import { SignUpFormComponent } from './sign-up-form.component';

describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;

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
    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
