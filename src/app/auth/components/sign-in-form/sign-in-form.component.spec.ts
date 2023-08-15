import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthModule } from '@app/auth/auth.module';
import { SignInFormComponent } from './sign-in-form.component';

describe('SignInFormComponent', () => {
  let component: SignInFormComponent;
  let fixture: ComponentFixture<SignInFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthModule],
    });
    fixture = TestBed.createComponent(SignInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
