import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressTagInputComponent } from './address-tag-input.component';

describe('AddressTagInputComponent', () => {
  let component: AddressTagInputComponent;
  let fixture: ComponentFixture<AddressTagInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressTagInputComponent],
    });
    fixture = TestBed.createComponent(AddressTagInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
