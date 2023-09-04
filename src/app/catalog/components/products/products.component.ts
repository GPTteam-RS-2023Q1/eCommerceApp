import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

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
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.products$.subscribe((val) => console.log(val));
  }

  public navigateToProduct(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
