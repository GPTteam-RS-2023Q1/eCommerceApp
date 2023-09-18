import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TotalPriceComponent } from './total-price.component';

describe('TotalPriceComponent', () => {
  let component: TotalPriceComponent;
  let fixture: ComponentFixture<TotalPriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalPriceComponent],
      providers: [provideMockStore({})],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
      ],
    });
    fixture = TestBed.createComponent(TotalPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
