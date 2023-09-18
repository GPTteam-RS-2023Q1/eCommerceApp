import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormBuilder, NonNullableFormBuilder } from '@angular/forms';
import { CartFacadeService } from '@app/user/services/cart-facade.service';
import { ProductService } from '@app/catalog/services/product.service';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CatalogModule } from '@app/catalog/catalog.module';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let fb: NonNullableFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [FormBuilder, CartFacadeService, ProductService, provideMockStore({})],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        CatalogModule,
      ],
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(NonNullableFormBuilder);
    component.sizeForm = fb.group({ size: '' });
    component.product = {
      createdAt: '',
      id: '',
      lastModifiedAt: '',
      masterData: {
        current: {
          categories: [],
          masterVariant: {
            attributes: [],
            id: 1,
            images: [{ url: '', dimensions: { h: 1, w: 1 } }],
            key: '',
            prices: [],
            sku: '',
          },
          metaDescription: { en: '', ru: '' },
          name: { en: '', ru: '' },
          slug: { en: '', ru: '' },
          variants: [],
          description: { en: '', ru: '' },
        },
        hasStagedChanges: false,
        published: true,
        staged: {
          categories: [],
          masterVariant: {
            attributes: [],
            id: 1,
            images: [{ url: '', dimensions: { h: 1, w: 1 } }],
            key: '',
            prices: [],
            sku: '',
          },
          metaDescription: { en: '', ru: '' },
          name: { en: '', ru: '' },
          slug: { en: '', ru: '' },
          variants: [],
          description: { en: '', ru: '' },
        },
      },
      productType: { attributes: [], id: '', typeId: '' },
      taxCategory: { id: '', typeId: '' },
      version: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
