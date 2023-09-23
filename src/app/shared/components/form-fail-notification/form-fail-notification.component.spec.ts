import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroup } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { FormFailNotificationComponent } from './form-fail-notification.component';

describe('FormFailNotificationComponent', () => {
  let component: FormFailNotificationComponent;
  let fixture: ComponentFixture<FormFailNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFailNotificationComponent],
      imports: [SharedModule],
    });
    fixture = TestBed.createComponent(FormFailNotificationComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
