import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

import { birthdayValidator } from '@app/auth/validators/birthday-validator';
import { AbstractRajiControl } from '@app/shared/models/classes/abstract-raji-control';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
  selector: 'ec-birthday-input',
  templateUrl: './birthday-input.component.html',
  styleUrls: ['./birthday-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BirthdayInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BirthdayInputComponent),
      multi: true,
    },
  ],
})
export class BirthdayInputComponent
  extends AbstractRajiControl<TuiDay | null>
  implements Validator, AfterViewInit
{
  public validate(control: AbstractControl): ValidationErrors | null {
    return birthdayValidator(control);
  }

  public ngAfterViewInit(): void {
    this.control.valueChanges.subscribe((value) => {
      this.onChange(value);
    });
  }
}
