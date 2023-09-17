import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { selectPriceWithoutDiscount } from '@app/ngrx/selectors/cart.selector';
import { TypedMoney } from '@app/shared/models/interfaces/product-variant';
import { CartFacadeService } from '@app/user/services/cart-facade.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ec-total-price',
  templateUrl: './total-price.component.html',
  styleUrls: ['./total-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalPriceComponent {
  @Input({ required: true }) public totalPrice!: TypedMoney | undefined;

  public fullPrice = this.store.select(selectPriceWithoutDiscount);

  constructor(public cartFacade: CartFacadeService, private store: Store) {}
}
