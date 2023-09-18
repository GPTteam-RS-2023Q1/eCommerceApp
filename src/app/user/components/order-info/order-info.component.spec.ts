import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserModule } from '@app/user/user.module';
import { CurrencyCode } from '@app/shared/models/enums/currency-code';
import { OrderInfoComponent } from './order-info.component';

describe('OrderInfoComponent', () => {
  let component: OrderInfoComponent;
  let fixture: ComponentFixture<OrderInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderInfoComponent],
      providers: [provideMockStore({})],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        UserModule,
      ],
    });
    fixture = TestBed.createComponent(OrderInfoComponent);
    component = fixture.componentInstance;
    component.cart = {
      discountCodes: [],
      id: '',
      lineItems: [],
      totalLineItemQuantity: 0,
      totalPrice: {
        centAmount: 0,
        currencyCode: CurrencyCode.USD,
        fractionDigits: 0,
        type: 'centPrecision',
      },
      version: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
