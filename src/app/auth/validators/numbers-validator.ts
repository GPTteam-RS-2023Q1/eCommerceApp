import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function numbersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;
    return /\d/.test(value) ? { whiteSpace: `Поле не должно содержать числа` } : null;
  };
}
