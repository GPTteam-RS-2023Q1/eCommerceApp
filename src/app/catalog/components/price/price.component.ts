import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Price } from '@app/shared/models/interfaces/product-variant';

@Component({
  selector: 'ec-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceComponent {
  @Input() public className = '';

  @Input({ required: true }) public price!: Price;

  public get discountedValue(): number {
    return this.price.discounted?.value.centAmount || 0;
  }

  public get baseValue(): number {
    return this.price.value.centAmount;
  }

  public formatPrice(price: number): string {
    return (price / 100).toFixed(2);
  }

  public hasDiscount(): boolean {
    return Boolean(this.price.discounted);
  }

  public getDiscountPrecentage(baseValue: number, discountedValue: number): number {
    return Math.round(100 - 100 / (baseValue / discountedValue));
  }
}
