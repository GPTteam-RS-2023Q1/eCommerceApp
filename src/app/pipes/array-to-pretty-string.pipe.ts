import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToPrettyString',
})
export class ArrayToPrettyStringPipe implements PipeTransform {
  public transform(array: string[]): string {
    const last = array.pop();
    switch (array.length) {
      case 0:
        return '';

      case 1:
        return array[0];

      default:
        return `${array.join(', ')} and ${last}`;
    }
  }
}
