import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthModule } from '@app/auth/auth.module';
import { AddressFormComponent } from './address-form.component';

describe('AdressFormComponent', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthModule],
    });
    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
