import { Pipe, PipeTransform } from '@angular/core';

import { ProductVariant } from '@app/shared/models/interfaces/product-variant';

@Pipe({
  name: 'getSizeOfVariant',
})
export class GetSizeOfVariantPipe implements PipeTransform {
  public transform(variant: ProductVariant): string {
    return variant.attributes.find((attr) => attr.name === 'size')?.value.key;
  }
}
