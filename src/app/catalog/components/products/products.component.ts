import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { QueryBuilderService } from '@app/catalog/services/query-builder.service';
import { catalogActions } from '@app/ngrx/actions/catalog.actions';
import { selectCatalogProducts } from '@app/ngrx/selectors/catalog.selector';

@Component({
  selector: 'ec-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  public products$ = this.store.select(selectCatalogProducts);

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly qb: QueryBuilderService
  ) {}

  public ngOnInit(): void {
    this.route.queryParamMap.subscribe(() => {
      this.store.dispatch(
        catalogActions.getProducts({
          params: this.qb.withParamsFromURL(this.route.snapshot).getBuildedParams(),
        })
      );
    });
  }

  public navigateToProduct(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
