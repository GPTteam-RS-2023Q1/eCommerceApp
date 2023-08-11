import { Directive, Host, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormControlName, FormGroupDirective } from '@angular/forms';

import { Subscription } from 'rxjs';

@Directive({
  selector: '[ecControlDependency]',
})
export class ControlDependencyDirective implements OnInit, OnDestroy {
  @Input('ecControlDependency') public controlName?: string;

  private subscription?: Subscription;

  constructor(
    @Host() @Optional() private readonly parentForm: FormGroupDirective,
    @Host() @Optional() private readonly control: FormControlName
  ) {}

  public ngOnInit(): void {
    if (this.controlName && this.parentForm && this.control) {
      const element = this.parentForm.form.get(String(this.control.name));
      const targetControl = this.parentForm.control.get(this.controlName);

      element?.disable();

      this.subscription = targetControl?.valueChanges.subscribe(() => {
        if (targetControl.valid) {
          element?.enable();

          return;
        }

        element?.disable();
      });
    }
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
