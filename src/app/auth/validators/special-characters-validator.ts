import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function specialCharactersValidator(fieldName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;
    return /[!@#$%^&*]/.test(value)
      ? { whiteSpace: `${fieldName} should not inculde special characters` }
      : null;
  };
}
