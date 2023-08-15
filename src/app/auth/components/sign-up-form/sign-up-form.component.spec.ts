import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthModule } from '@app/auth/auth.module';
import { SignUpFormComponent } from './sign-up-form.component';

describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthModule],
    });
    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
