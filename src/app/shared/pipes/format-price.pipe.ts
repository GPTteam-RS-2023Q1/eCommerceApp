import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice',
})
export class FormatPricePipe implements PipeTransform {
  public transform(price: number): string {
    return (price / 100).toFixed(2);
  }
}
