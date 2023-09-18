import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { TotalPriceComponent } from './total-price.component';

describe('TotalPriceComponent', () => {
  let component: TotalPriceComponent;
  let fixture: ComponentFixture<TotalPriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalPriceComponent],
      providers: [provideMockStore({})],
    });
    fixture = TestBed.createComponent(TotalPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
