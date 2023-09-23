import { ChangeDetectionStrategy, Component, Inject, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { CategoryService } from '@app/catalog/services/category.service';
import { ProductService } from '@app/catalog/services/product.service';
import { QueryBuilderService } from '@app/catalog/services/query-builder.service';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import { FilterModalComponent } from '../filter-modal/filter-modal.component';

@Component({
  selector: 'ec-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  constructor(
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    private route: ActivatedRoute,
    private queryBuilder: QueryBuilderService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private store: Store
  ) {}

  public open(): void {
    this.dialogs
      .open(new PolymorpheusComponent(FilterModalComponent, this.injector))
      .subscribe(() => {});
  }
}
