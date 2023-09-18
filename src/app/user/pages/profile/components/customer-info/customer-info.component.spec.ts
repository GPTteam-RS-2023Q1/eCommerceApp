import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModule } from '@app/user/user.module';
import { CustomerInfoComponent } from './customer-info.component';

describe('CustomerInfoComponent', () => {
  let component: CustomerInfoComponent;
  let fixture: ComponentFixture<CustomerInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerInfoComponent],
      imports: [UserModule],
    });
    fixture = TestBed.createComponent(CustomerInfoComponent);
    component = fixture.componentInstance;
    component.customer = {
      addresses: [],
      billingAddressIds: [],
      dateOfBirth: '',
      defaultBillingAddressId: '',
      defaultShippingAddressId: '',
      email: '',
      firstName: '',
      id: '',
      lastName: '',
      password: '',
      shippingAddressIds: [],
      version: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
