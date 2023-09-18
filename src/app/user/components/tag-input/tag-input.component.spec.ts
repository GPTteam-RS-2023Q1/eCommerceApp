import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagInputComponent } from './tag-input.component';

describe('AddressTagInputComponent', () => {
  let component: TagInputComponent;
  let fixture: ComponentFixture<TagInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagInputComponent],
    });
    fixture = TestBed.createComponent(TagInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
