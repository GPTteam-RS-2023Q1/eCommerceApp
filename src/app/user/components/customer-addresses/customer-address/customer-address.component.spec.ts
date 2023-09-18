import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { UserModule } from '@app/user/user.module';
import { CustomerAddressComponent } from './customer-address.component';
import { CustomerActionBuilder } from '../../../services/customer-action-builder.service';

describe('CustomerAddressComponent', () => {
  let component: CustomerAddressComponent;
  let fixture: ComponentFixture<CustomerAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAddressComponent],
      imports: [HttpClientTestingModule, UserModule],
      providers: [provideMockStore({}), CustomerActionBuilder],
    });
    fixture = TestBed.createComponent(CustomerAddressComponent);
    component = fixture.componentInstance;
    component.address = {
      city: '',
      country: '',
      id: '',
      postalCode: '',
      streetName: '',
      tags: [],
      key: '',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
