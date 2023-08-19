import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function numbersValidator(fieldName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;
    return /\d/.test(value)
      ? { whiteSpace: `${fieldName} should not inculde numbers` }
      : null;
  };
}
