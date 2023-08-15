import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from '@app/auth/pages/sign-up/sign-up.component';
import { AuthModule } from '@app/auth/auth.module';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthModule],
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
