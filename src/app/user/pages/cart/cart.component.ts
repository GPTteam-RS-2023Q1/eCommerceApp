import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    private store: Store,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.cart$.subscribe((data) => {
      console.log(data?.lineItems);
    });
  }

  public navigateToProduct(id: string): void {
    this.router.navigate(['/store/catalog/clothes', id]);
  }
}
