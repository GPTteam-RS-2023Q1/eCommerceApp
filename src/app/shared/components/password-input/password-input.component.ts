import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

import { AbstractRajiControl } from '@app/shared/models/classes/abstract-raji-control';

@Component({
  selector: 'ec-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
})
export class PasswordInputComponent
  extends AbstractRajiControl<string>
  implements Validator
{
  public validate(control: AbstractControl<string>): ValidationErrors | null {
    const { value } = control;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const numbers = /[0-9]/;
    const specialSymbols = /[!@#$%^&*]/;
    const spaces = /\s/;

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
}
