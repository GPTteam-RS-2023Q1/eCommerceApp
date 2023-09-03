import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectCatalogProducts } from '@app/ngrx/selectors/catalog.selector';

@Component({
  selector: 'ec-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  public products$ = this.store.select(selectCatalogProducts);

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {}

  public navigateToProduct(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
