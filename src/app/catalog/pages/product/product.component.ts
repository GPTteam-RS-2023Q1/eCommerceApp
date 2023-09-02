import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map, Observable } from 'rxjs';

import { Product } from '@app/core/models/product';

@Component({
  selector: 'ec-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  public product$!: Observable<Product>;

  constructor(private readonly route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.product$ = this.route.data.pipe(
      map((data) => {
        console.log(data['product']);
        return data['product'];
      })
    );
  }
}
