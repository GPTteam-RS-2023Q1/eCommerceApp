import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { QueryBuilderService } from '@app/catalog/services/query-builder.service';
import { catalogActions } from '@app/ngrx/actions/catalog.actions';
import { selectCatalogProducts } from '@app/ngrx/selectors/catalog.selector';

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
    private readonly qb: QueryBuilderService
  ) {}

  public ngOnInit(): void {
    this.subs.add(this.route.queryParamMap.subscribe(this.onRouteChange));
    this.subs.add(this.products$.subscribe(this.scrollToTop));
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

  private scrollToTop = (): void => {
    window.scrollTo({ top: 0 });
  };
}
