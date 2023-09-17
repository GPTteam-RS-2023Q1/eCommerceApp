import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Attribute, Price } from '@app/shared/models/interfaces/product-variant';
import { NotificationService } from '@app/shared/services/notofication.service';
import { LineItem } from '@app/user/models/cart.model';
import { CartActionBuilderService } from '@app/user/services/cart-action-builder.service';
import { CartService } from '@app/user/services/cart.service';

@Component({
  selector: 'ec-card-basket',
  templateUrl: './card-basket.component.html',
  styleUrls: ['./card-basket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBasketComponent {
  @Input() public cardItem!: LineItem;

  constructor(
    private readonly cartService: CartService,
    private readonly cab: CartActionBuilderService,
    private readonly store: Store,
    private readonly notifyService: NotificationService
  ) {}

  public getAttribute(attributes: Attribute[], attr: string): string {
    return attr === 'size'
      ? attributes.find((attribute) => attribute.name === attr)?.value.label
      : attributes.find((attribute) => attribute.name === attr)?.value;
  }

  public formatPrice(price: number): string {
    return (price / 100).toFixed(2);
  }

  public getPrice(price: Price, count: number): string {
    const value = price.discounted?.value.centAmount ?? price.value.centAmount;
    return ((value / 100) * count).toFixed(2);
  }
}
