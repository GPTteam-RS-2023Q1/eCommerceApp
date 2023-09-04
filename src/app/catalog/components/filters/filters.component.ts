import { ChangeDetectionStrategy, Component, Inject, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { QueryBuilderService } from '@app/catalog/services/query-builder.service';
import { ActivatedRoute } from '@angular/router';
import { exhaustMap } from 'rxjs';
import { CategoryService } from '@app/core/services/category.service';
import { ProductService } from '@app/core/services/product.service';
import { Store } from '@ngrx/store';
import { catalogActions } from '@app/ngrx/actions/catalog.actions';
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
      .subscribe(() => {
        this.getFilteredProducts();
      });
  }

  private getFilteredProducts(): void {
    this.route.params
      .pipe(
        exhaustMap((params) => {
          return this.categoryService.getCategoryByKey(params['category']);
        })
      )
      .subscribe((key) => {
        this.route.queryParamMap.subscribe((params) => {
          this.queryBuilder
            .withCategory(key.id)
            .withColor(params.getAll('colors'))
            .withSeason(params.getAll('seasons'))
            .withPattern(params.getAll('patterns'))
            .withPrice(params.getAll('price').map((value) => Number(value)));
          this.productService
            .getProducts(this.queryBuilder.getParams())
            .subscribe((val) => {
              this.store.dispatch(
                catalogActions.getProductsSuccess({ products: val.results })
              );
            });
        });
      });
  }
}
