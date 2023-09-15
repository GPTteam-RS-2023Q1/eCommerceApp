import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectCart } from '@app/ngrx/selectors/cart.selector';

@Component({
  selector: 'ec-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  public cart$ = this.store.select(selectCart);
  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.cart$.subscribe((val) => {
      console.log(val);
    });
  }
}
