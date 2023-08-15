import { AbstractControl, ValidationErrors } from '@angular/forms';

import { TuiDay } from '@taiga-ui/cdk';

export function dateValidator(control: AbstractControl<TuiDay>): ValidationErrors | null {
  const { value } = control;
  if (!value) {
    return { other: 'enter valid date' };
  }
  const minYear = 13;
  const difference = new Date(
    Date.now() - new Date(control.value.toLocalNativeDate()).getTime()
  );
  return Math.abs(difference.getFullYear() - 1970) >= minYear
    ? null
    : { other: 'minimum age 13' };
}
