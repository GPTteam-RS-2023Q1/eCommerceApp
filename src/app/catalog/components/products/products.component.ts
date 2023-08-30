import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

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

  constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(catalogActions.getProducts());
    this.products$.subscribe((val) => console.log(val));
  }
}
