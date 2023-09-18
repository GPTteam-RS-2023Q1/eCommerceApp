import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { selectDiscounts } from '@app/ngrx/selectors/cart.selector';
import { Cart } from '@app/user/models/cart.model';
import { CartFacadeService } from '@app/user/services/cart-facade.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ec-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderInfoComponent implements OnInit {
  @Input({ required: true }) public cart!: Cart | null;
  public discounts$ = this.store.select(selectDiscounts);

  public cartDiscounts = this.cartServiceFacade.cartDiscounts;

  constructor(private store: Store, private cartServiceFacade: CartFacadeService) {}

  public ngOnInit(): void {
    this.cartServiceFacade.getCartDiscounts();
  }

  public removeDiscountCode(id: string): void {
    this.cartServiceFacade.removeDiscountCode(id);
  }
}
