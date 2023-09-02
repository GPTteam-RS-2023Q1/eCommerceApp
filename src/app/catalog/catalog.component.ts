import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { CategoryService } from '@app/core/services/category.service';
import { catalogActions } from '@app/ngrx/actions/catalog.actions';

import { QueryBuilderService } from './services/query-builder.service';

@Component({
  selector: 'ec-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit, OnDestroy {
  private subscribtion = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private queryBuilder: QueryBuilderService,
    private categoryService: CategoryService
  ) {}

  public ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  public ngOnInit(): void {
    this.onUrlChange();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log(1);
        this.onUrlChange();
      }
    });
  }

  private onUrlChange(): void {
    const { category } = this.route.snapshot.params;
    this.subscribtion.add(
      this.categoryService.getCategoryByKey(category).subscribe((value) => {
        this.queryBuilder.withCategory(value.id);
        const queryParams = this.queryBuilder.getParams();
        this.store.dispatch(catalogActions.getProducts({ params: queryParams }));
      })
    );
  }
}
