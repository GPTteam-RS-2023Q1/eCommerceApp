import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const { value } = control;
  const uppercase = /[A-Z]+/;
  const lowercase = /[a-z]+/;
  const numbers = /[0-9]+/;
  const specialSymbols = /[!@#$%^&*]+/;
  const spaces = /\s+/;

  if (value.length < 8) {
    return { other: 'Minimum length - 8' };
  }

  if (!uppercase.test(value)) {
    return { other: 'the password must include at least a uppercase letter' };
  }

  if (!lowercase.test(value)) {
    return {
      other: 'the password must include at least one lowercase letter',
    };
  }

  if (!numbers.test(value)) {
    return {
      other: 'the password must include at least one number',
    };
  }

  if (!specialSymbols.test(value)) {
    return {
      other: 'the password must include at least one special symbol (!@#$%^&*)',
    };
  }

  if (spaces.test(value)) {
    return { other: 'the password should not include spaces' };
  }

  return null;
}
