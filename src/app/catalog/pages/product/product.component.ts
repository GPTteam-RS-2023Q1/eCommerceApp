import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { map, Observable } from 'rxjs';

import { Product } from '@app/core/models/product';
import { ProductVariant } from '@app/core/models/product-variant';

@Component({
  selector: 'ec-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  public product$!: Observable<Product>;

  public controlSize = new FormControl();

  public items = ['John', 'Eric', 'Graham'];

  constructor(private readonly route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.product$ = this.route.data.pipe(
      map((data) => {
        console.log(data['product']);
        return data['product'];
      })
    );
  }

  public getSize(variants: ProductVariant[]): string[] {
    const size: string[] = variants.map(
      (v) => v.attributes.find((attribute) => attribute.name === 'size')?.value.label
    );
    return size;
  }

  public translate(str: string): string {
    switch (str) {
      case 'season':
        return 'сезон';
      case 'color':
        return 'цвет';
      case 'pattern':
        return 'узор';
      case 'brand':
        return 'бренд';
      default:
        return '';
    }
  }
}
