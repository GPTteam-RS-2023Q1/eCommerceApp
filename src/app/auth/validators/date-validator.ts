import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateValidator(control: AbstractControl<string>): ValidationErrors | null {
  const minYear = 13;
  const difference = new Date(Date.now() - new Date(control.value).getTime());
  return Math.abs(difference.getFullYear() - 1970) >= minYear
    ? null
    : { other: 'minimum age 13' };
}
