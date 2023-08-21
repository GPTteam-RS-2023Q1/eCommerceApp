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
  selector: 'ec-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => EmailInputComponent),
    },
  ],
})
export class EmailInputComponent
  extends AbstractRajiControl<string>
  implements Validator
{
  @Input() public placeholder = '';

  public validate(control: AbstractControl<string>): ValidationErrors | null {
    const { value } = control;
    const emailPattern = /^(?=\S)[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    return emailPattern.test(value) ? null : { other: 'Email is invalid' };
  }
}
