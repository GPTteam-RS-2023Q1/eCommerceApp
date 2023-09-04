import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProductService } from '@app/core/services/product.service';

import { QueryBuilderService } from './services/query-builder.service';

@Component({
  selector: 'ec-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent /* implements OnInit  */ {
  constructor(private service: ProductService, private qb: QueryBuilderService) {}

  /* public ngOnInit(): void {
    this.service
      .getProducts({
        parameters: this.qb.fiterByText('камуфляж').getBuildedParams(),
      })
      .subscribe((val) => {
        console.log(val);
      });
  } */
}
