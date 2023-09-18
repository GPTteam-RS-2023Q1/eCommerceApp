import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { UserModule } from '@app/user/user.module';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [provideMockStore({})],
      imports: [UserModule],
    });
    fixture = TestBed.createComponent(ProfileComponent);
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
