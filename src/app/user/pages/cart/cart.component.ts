import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LineItem } from '@app/user/models/cart.model';
import { CartFacadeService } from '@app/user/services/cart-facade.service';

@Component({
  selector: 'ec-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  public cart$ = this.cartFacade.cart$;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public readonly cartFacade: CartFacadeService
  ) {}

  public navigateToProduct(id: string): void {
    this.router.navigate(['store', 'catalog', 'clothes', id], {
      relativeTo: this.route.root,
    });
  }

  public identify(index: number, item: LineItem): string {
    return `${item.id}-${item.quantity}`;
  }
}
