import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountInputComponent } from './discount-input.component';

describe('DiscountInputComponent', () => {
  let component: DiscountInputComponent;
  let fixture: ComponentFixture<DiscountInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountInputComponent],
    });
    fixture = TestBed.createComponent(DiscountInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
