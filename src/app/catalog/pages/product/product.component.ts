import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

import { combineLatest, EMPTY, Observable, of, startWith, switchMap } from 'rxjs';

import { ProductService } from '@app/catalog/services/product.service';
import { Product, ProductType } from '@app/shared/models/interfaces/product';
import { ProductVariant } from '@app/shared/models/interfaces/product-variant';
import { CartFacadeService } from '@app/user/services/cart-facade.service';

@Component({
  selector: 'ec-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  @Input() public product!: Product;

  public productType!: Observable<ProductType>;

  public sizes!: string[];

  public sizeForm = this.fb.group({
    size: '',
  });

  public isVariantInCart!: Observable<boolean>;

  constructor(
    private productService: ProductService,
    private cartFacade: CartFacadeService,
    private fb: NonNullableFormBuilder
  ) {}

  public ngOnInit(): void {
    this.productType = this.productService.getProductTypeById(
      this.product.productType.id
    );
    this.sizes = this.getSizes(this.product.masterData.current.variants);
    this.sizeForm.patchValue({
      size: this.sizes[0],
    });
    this.isVariantInCart = combineLatest([
      this.sizeForm.valueChanges.pipe(startWith(this.sizeForm.value)),
      this.cartFacade.cart$,
    ]).pipe(
      switchMap(([sizeForm, cart]) => {
        const variant = this.getVariantBySize(sizeForm.size || '');
        return variant
          ? of(
              !!cart?.lineItems.find(
                (item) =>
                  item.productId === this.product.id && item.variant.id === variant.id
              )
            )
          : EMPTY;
      })
    );
  }

  public getSizes(variants: ProductVariant[]): string[] {
    return variants.map(
      (v) => v.attributes.find((attribute) => attribute.name === 'size')?.value.label
    );
  }

  public getVariantBySize(size: string): ProductVariant | undefined {
    return this.product.masterData.current.variants.find((variant) =>
      variant.attributes.some((attr) => attr.value.label === size)
    );
  }

  public removeLineItem(): void {
    const variant = this.getVariantBySize(this.sizeForm.getRawValue().size);
    if (variant) {
      this.cartFacade
        .getLineItemByProductandVariant(this.product, variant)
        .subscribe((item) => {
          if (item) {
            this.cartFacade.removeLineItem(item.id);
          }
        });
    }
  }

  public addLineItem(): void {
    const variant = this.getVariantBySize(this.sizeForm.getRawValue().size);
    if (variant) {
      this.cartFacade.addLineItem(this.product, variant);
    }
  }
}
