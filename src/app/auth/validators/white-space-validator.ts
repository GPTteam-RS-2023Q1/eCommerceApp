import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function whiteSpaceValidator(fieldName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;
    return /\s/.test(value)
      ? { whiteSpace: `${fieldName} should not inculde white spaces` }
      : null;
  };
}
