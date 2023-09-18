import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { DiscountInputComponent } from './discount-input.component';

describe('DiscountInputComponent', () => {
  let component: DiscountInputComponent;
  let fixture: ComponentFixture<DiscountInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountInputComponent],
      providers: [provideMockStore({})],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(DiscountInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
