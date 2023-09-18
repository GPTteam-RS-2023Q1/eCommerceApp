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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
