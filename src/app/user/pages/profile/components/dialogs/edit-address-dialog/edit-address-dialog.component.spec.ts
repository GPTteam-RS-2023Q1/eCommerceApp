import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddressDialogComponent } from './edit-address-dialog.component';

describe('EditAddressDialogComponent', () => {
  let component: EditAddressDialogComponent;
  let fixture: ComponentFixture<EditAddressDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAddressDialogComponent],
    });
    fixture = TestBed.createComponent(EditAddressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
