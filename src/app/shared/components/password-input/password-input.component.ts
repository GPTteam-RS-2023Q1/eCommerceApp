import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
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
  @Input() public title = 'Пароль';

  public validate(control: AbstractControl<string>): ValidationErrors | null {
    const { value } = control;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const numbers = /[0-9]/;
    const specialSymbols = /[!@#$%^&*]/;
    const spaces = /\s/;

    if (value.length < 8) {
      return { other: 'Минимальное количество символов - 8' };
    }

    if (!uppercase.test(value)) {
      return { other: 'Пароль должен содержать минимум одну заглавную букву' };
    }

    if (!lowercase.test(value)) {
      return {
        other: 'Пароль должен содержать минимум одну строчную букву',
      };
    }

    if (!numbers.test(value)) {
      return {
        other: 'Пароль должен содержать минимум одну цифру',
      };
    }

    if (!specialSymbols.test(value)) {
      return {
        other: 'Пароль должен содержать минимум один специальный символ (!@#$%^&*)',
      };
    }

    if (spaces.test(value)) {
      return { other: 'Пароль не должен содержать пробельных символов' };
    }

    return null;
  }
}
