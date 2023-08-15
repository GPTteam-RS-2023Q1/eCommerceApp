import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from '@app/auth/pages/sign-in/sign-in.component';
import { AuthModule } from '@app/auth/auth.module';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthModule],
    });
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
