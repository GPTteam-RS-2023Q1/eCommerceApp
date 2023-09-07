import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function specialCharactersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;
    return /[!@#$%^&*]/.test(value)
      ? { whiteSpace: `Поле не должно содержать специальных символов` }
      : null;
  };
}
