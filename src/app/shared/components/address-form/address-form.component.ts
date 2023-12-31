import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';

import { map, Subscription } from 'rxjs';

import { numbersValidator } from '@app/auth/validators/numbers-validator';
import { specialCharactersValidator } from '@app/auth/validators/special-characters-validator';
import { COUNTRIES, CountryData, defaultCountryData } from '@app/consts/country-data';
import { AddressForm } from '@app/shared/models/interfaces/address-from.model';

@Component({
  selector: 'ec-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true,
    },
  ],
})
export class AddressFormComponent
  implements ControlValueAccessor, OnInit, Validator, OnDestroy
{
  @Input() public legend?: string;

  public items = Object.values(COUNTRIES)
    .map((country) => country.name)
    .sort();

  public form!: FormGroup;

  public onTouch!: () => void;

  public selectedCountry: CountryData = defaultCountryData;

  private subscription = new Subscription();

  constructor(private readonly fb: NonNullableFormBuilder) {}

  public writeValue(
    value: AddressForm,
    options: { onlySelf?: boolean; emitEvent?: boolean } = {
      onlySelf: false,
      emitEvent: false,
    }
  ): void {
    this.form.patchValue(value, options);
    this.selectedCountry = this.getCountryData(value.country);

    const country = this.form.get('country');
    const postalCode = this.form.get('postalCode');

    if (country?.valid) {
      postalCode?.enable();

      return;
    }

    postalCode?.disable();
  }

  public registerOnChange(fn: (value: AddressForm) => void): void {
    this.subscription.add(
      this.form.valueChanges.pipe(map(() => this.form.getRawValue())).subscribe(fn)
    );
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();

      return;
    }

    this.form.enable();
  }

  public validate(): ValidationErrors | null {
    return this.form.valid
      ? null
      : Object.fromEntries(
          Object.entries(this.form.controls).map(([key, value]) => [key, value.errors])
        );
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      country: ['', this.countryValidator],
      city: ['', [Validators.required, numbersValidator(), specialCharactersValidator()]],
      streetName: ['', Validators.required],
      postalCode: ['', this.postalCodeValidator],
    });

    this.form.get('country')?.valueChanges.subscribe((country) => {
      this.selectedCountry = this.getCountryData(country);
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private countryValidator = (
    control: AbstractControl<string>
  ): ValidationErrors | null => {
    const { value } = control;

    return this.items.includes(value) ? null : { address: 'Выберите страну из списка' };
  };

  private postalCodeValidator = (
    control: AbstractControl<string>
  ): ValidationErrors | null => {
    if (this.selectedCountry) {
      const country = this.selectedCountry.regExp;
      return country.test(control.value)
        ? null
        : {
            postalCode: `Почтовый индекс не соответствует почтовой системе страны ${this.selectedCountry.name}`,
          };
    }

    return null;
  };

  private getCountryData(country: string): CountryData {
    const data = COUNTRIES[country];
    return data || defaultCountryData;
  }
}
