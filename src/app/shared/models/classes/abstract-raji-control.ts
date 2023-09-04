import { ControlValueAccessor, FormControl } from '@angular/forms';

export abstract class AbstractRajiControl<T> implements ControlValueAccessor {
  public control = new FormControl();

  public onChange!: (event: T) => void;

  public onTouch!: () => void;

  public writeValue(value: T): void {
    this.control.patchValue(value);
  }

  public registerOnChange(fn: (event: T) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();

      return;
    }

    this.control.enable();
  }

  public onInput(): void {
    console.log(1);
    this.onChange(this.control.value);
  }
}
