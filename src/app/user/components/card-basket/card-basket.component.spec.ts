import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserModule } from '@app/user/user.module';
import { CurrencyCode } from '@app/shared/models/enums/currency-code';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardBasketComponent } from './card-basket.component';

describe('CardBasketComponent', () => {
  let component: CardBasketComponent;
  let fixture: ComponentFixture<CardBasketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardBasketComponent],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        UserModule,
        BrowserAnimationsModule,
      ],
      providers: [provideMockStore({})],
    });
    fixture = TestBed.createComponent(CardBasketComponent);
    component = fixture.componentInstance;
    component.lineItem = {
      custom: {
        fields: { 'short-description': '', description: '' },
        type: { key: '', typeId: 'type' },
      },
      id: '',
      name: { en: '', ru: '' },
      price: {
        countryCode: '',
        id: '',
        key: '',
        value: {
          centAmount: 0,
          currencyCode: CurrencyCode.USD,
          fractionDigits: 0,
          type: 'centPrecision',
        },
      },
      productId: '',
      productKey: '',
      productType: { attributes: [], id: '', typeId: '' },
      quantity: 0,
      totalPrice: {
        centAmount: 0,
        currencyCode: CurrencyCode.USD,
        fractionDigits: 0,
        type: 'centPrecision',
      },
      variant: {
        attributes: [],
        id: 1,
        images: [{ url: 'test', dimensions: { w: 1, h: 1 } }],
        key: '',
        prices: [],
        sku: '',
      },
      key: '',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
