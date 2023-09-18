import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountInfoComponent } from './discount-info.component';

describe('DiscountInfoComponent', () => {
  let component: DiscountInfoComponent;
  let fixture: ComponentFixture<DiscountInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountInfoComponent],
    });
    fixture = TestBed.createComponent(DiscountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
