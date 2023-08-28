import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Product } from '@app/core/models/product';

@Component({
  selector: 'ec-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input() public product?: Product;

  public price!: string;

  public url!: string;

  public getPrice(): string {
    const price = this.product?.masterData.current.masterVariant.prices[0];
    if (price) {
      return (Number(price.value.centAmount) / 100).toFixed(2);
    }

    return '';
  }

  public getImage(): string {
    return this.product?.masterData.current.masterVariant.images[0].url || '';
  }

  public ngOnInit(): void {
    this.price = this.getPrice();
    this.url = this.getImage();
  }
}
