import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { distinctUntilChanged, map, Observable, Subject, switchMap } from 'rxjs';

import { ProductService } from '@app/catalog/services/product.service';
import { QueryBuilderService } from '@app/catalog/services/query-builder.service';
import { UrlBuilderService } from '@app/catalog/services/url-builder.service';

type Fuzzy = {
  input: string;
  link: string;
};

@Component({
  selector: 'ec-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  public readonly control = new FormControl('');

  public request$$ = new Subject<string>();

  public response$!: Observable<Fuzzy[]>;

  public search: string | null = '';

  constructor(
    private readonly qb: QueryBuilderService,
    private readonly productSerivce: ProductService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly urlBuilder: UrlBuilderService
  ) {}

  public ngOnInit(): void {
    this.response$ = this.request$$.pipe(
      distinctUntilChanged(),
      switchMap(() => {
        const query = this.qb.fiterByText(this.search || '').getBuildedParams();
        return this.productSerivce.getProducts({ parameters: query, limit: 5 });
      }),
      map((products) => {
        return products.results.map((product) => {
          const color =
            product.masterVariant.attributes.find((attr) => attr.name === 'color')
              ?.value || '';
          return {
            input: `${product.name.ru}: ${product.metaDescription.ru} ${color}`,
            link: product.id,
          };
        }) as Fuzzy[];
      })
    );
  }

  public request(query: string | null): Observable<readonly Fuzzy[] | null> {
    this.request$$.next(query || ``);

    return this.response$;
  }

  public onSelect(variant: Fuzzy): void {
    this.router.navigate([variant.link], { relativeTo: this.route });
    this.control.patchValue(variant.input);
  }

  public onEnter(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      e.preventDefault();
      const queryParams = this.urlBuilder
        .withTextSearch(this.search || '')
        .getBuildedQuery();
      this.router.navigate(['store/catalog/clothes'], { queryParams });
      this.control.patchValue('');
    }
  }
}
