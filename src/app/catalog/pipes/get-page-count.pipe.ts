import { Pipe, PipeTransform } from '@angular/core';

import { PRODUCTS_PER_PAGE } from '../consts/consts';

@Pipe({
  name: 'getPageCount',
})
export class GetPageCountPipe implements PipeTransform {
  public transform(total: number): number {
    return Math.ceil(total / PRODUCTS_PER_PAGE);
  }
}
