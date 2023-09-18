import { Pipe, PipeTransform } from '@angular/core';

import { ProductType } from '@app/shared/models/interfaces/product';

@Pipe({
  name: 'translateAttribute',
})
export class TranslateAttributePipe implements PipeTransform {
  public transform(name: string, productType: ProductType | null): string {
    return productType
      ? productType.attributes.find((attr) => attr.name === name)?.label.en || ''
      : '';
  }
}
