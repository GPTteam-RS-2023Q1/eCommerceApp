import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { selectCurrency } from '@app/ngrx/selectors/cart.selector';
import { CurrencyCode } from '@app/shared/models/enums/currency-code';
import { TypedMoney } from '@app/shared/models/interfaces/product-variant';
import { CartDiscount } from '@app/user/models/discounts.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ec-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountInfoComponent implements OnInit, OnDestroy {
  @Input({ required: true }) public cartDiscounts: CartDiscount[] = [];
  public cartCurrency: CurrencyCode = CurrencyCode.USD;
  public cartCurrency$ = this.store.select(selectCurrency);
  private subs = new Subscription();

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.subs.add(
      this.cartCurrency$.subscribe((currency) => {
        if (currency) {
          this.cartCurrency = currency;
        }
      })
    );
  }

  public getCurrency(money: TypedMoney[] | undefined): TypedMoney | undefined {
    if (money) {
      return money.find((item) => item.currencyCode === this.cartCurrency);
    }

    return undefined;
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
