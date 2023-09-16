import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { ProductProjection } from '@app/catalog/models/product-projection';
import { QueryBuilderService } from '@app/catalog/services/query-builder.service';
import { cartActions } from '@app/ngrx/actions/cart.actions';
import { catalogActions } from '@app/ngrx/actions/catalog.actions';
import { selectCatalogProducts } from '@app/ngrx/selectors/catalog.selector';
import { ProductVariant } from '@app/shared/models/interfaces/product-variant';
import { NotificationService } from '@app/shared/services/notofication.service';
import { CartActionBuilderService } from '@app/user/services/cart-action-builder.service';
import { CartFacadeService } from '@app/user/services/cart-facade.service';
import { CartService } from '@app/user/services/cart.service';

@Component({
  selector: 'ec-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit, OnDestroy {
  public products$ = this.store.select(selectCatalogProducts);

  private subs = new Subscription();

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly qb: QueryBuilderService,
    private readonly cartService: CartService,
    private readonly cab: CartActionBuilderService,
    private readonly notifyService: NotificationService,
    private readonly cartFacade: CartFacadeService
  ) {}

  public ngOnInit(): void {
    this.subs.add(this.route.queryParamMap.subscribe(this.onRouteChange));
    this.subs.add(
      this.products$.subscribe(() => {
        window.scrollTo({ top: 0 });
      })
    );
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public navigateToProduct(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  private onRouteChange = (): void => {
    this.store.dispatch(
      catalogActions.getProducts({
        params: this.qb.withParamsFromURL(this.route.snapshot).getBuildedParams(),
      })
    );
  };

  public addToCart(product: ProductProjection, variant: ProductVariant): void {
    this.cartFacade.getLineItemByProductandVariant(product, variant).subscribe((item) => {
      if (item) {
        this.notifyService.notify('Продукт уже есть в корзине', 'warning');
        return;
      }
      this.cartService
        .updateCart(this.cab.addLineItem(product.id, variant).getActions())
        .subscribe((cart) => {
          this.store.dispatch(cartActions.saveCart({ cart }));
          this.notifyService.notify('Продукт добавлен в корзину', 'success');
        });
    });
  }
}
