import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '@app/shared/shared.module';
import { BirthdayInputComponent } from './birthday-input.component';

describe('BirthdayInputComponent', () => {
  let component: BirthdayInputComponent;
  let fixture: ComponentFixture<BirthdayInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BirthdayInputComponent],
      imports: [SharedModule],
    });
    fixture = TestBed.createComponent(BirthdayInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
