import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressComponent } from './customer-address.component';

describe('CustomerAddressComponent', () => {
  let component: CustomerAddressComponent;
  let fixture: ComponentFixture<CustomerAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAddressComponent],
    });
    fixture = TestBed.createComponent(CustomerAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
