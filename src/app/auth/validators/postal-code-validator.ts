import { AbstractControl, ValidationErrors } from '@angular/forms';

import { COUNTRY_DATA } from '@app/consts/country-data';

export function postalCodeValidator(
  control: AbstractControl<string>
): ValidationErrors | null {
  const country = control.parent?.get('country')?.value;
  return COUNTRY_DATA[country].test(control.value)
    ? null
    : { postalCode: 'Not valid postal code' };
}
