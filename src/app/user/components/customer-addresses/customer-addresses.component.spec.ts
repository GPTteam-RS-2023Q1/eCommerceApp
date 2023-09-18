import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressesComponent } from './customer-addresses.component';

describe('CustomerAddressComponent', () => {
  let component: CustomerAddressesComponent;
  let fixture: ComponentFixture<CustomerAddressesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAddressesComponent],
    });
    fixture = TestBed.createComponent(CustomerAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
