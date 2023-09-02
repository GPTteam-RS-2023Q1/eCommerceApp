import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { catalogActions } from '@app/ngrx/actions/catalog.actions';

import { QueryBuilderService } from './services/query-builder.service';

@Component({
  selector: 'ec-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private queryBuilder: QueryBuilderService
  ) {}

  public ngOnInit(): void {
    const { params } = this.route.snapshot;
    Object.entries(params).forEach(([key, value]: string[]) => {
      this.queryBuilder.queryDictionary[key](value);
    });
    const queryParams = this.queryBuilder.getParams();
    console.log(queryParams.get('filter'));
    this.store.dispatch(catalogActions.getProducts({ params: queryParams }));
    /*  this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
      }
    }); */
  }
}
