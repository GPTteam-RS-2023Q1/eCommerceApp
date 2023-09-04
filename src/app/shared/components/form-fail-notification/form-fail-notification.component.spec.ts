import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFailNotificationComponent } from './form-fail-notification.component';

describe('FormFailNotificationComponent', () => {
  let component: FormFailNotificationComponent;
  let fixture: ComponentFixture<FormFailNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFailNotificationComponent],
    });
    fixture = TestBed.createComponent(FormFailNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
