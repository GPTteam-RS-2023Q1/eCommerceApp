import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailValidator(
  control: AbstractControl<string>
): ValidationErrors | null {
  const { value } = control;
  const emailPattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  return emailPattern.test(value) ? null : { other: 'email is invalid' };
}
