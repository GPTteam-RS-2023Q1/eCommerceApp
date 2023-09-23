import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function whiteSpaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;
    return /\s/.test(value)
      ? { whiteSpace: `Поле не должно содержать пробельных символов` }
      : null;
  };
}
