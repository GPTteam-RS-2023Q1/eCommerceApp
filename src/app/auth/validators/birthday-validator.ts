import { AbstractControl, ValidationErrors } from '@angular/forms';

import { TuiDay } from '@taiga-ui/cdk';

export function birthdayValidator(
  control: AbstractControl<TuiDay>
): ValidationErrors | null {
  if (!control.value) {
    return { other: 'Впишите корректную дату' };
  }
  const date = control.value.toLocalNativeDate();
  const minYear = 13;
  const difference = new Date(Date.now() - new Date(date).getTime());
  return Math.abs(difference.getFullYear() - 1970) >= minYear &&
    date.getFullYear() <= new Date().getFullYear()
    ? null
    : { other: 'Минимальный возраст 13 лет' };
}
