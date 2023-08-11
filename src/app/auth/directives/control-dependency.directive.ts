import { Directive, Host, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[ecControlDependency]',
})
export class ControlDependencyDirective implements OnInit, OnDestroy {
  @Input('ecControlDependency') public controlName?: string;

  // private readonly subscription: Subscription;

  constructor(
    @Host() @Optional() @Self() private readonly parentForm: FormGroupDirective
  ) {}

  public ngOnInit(): void {
    if (this.controlName && this.parentForm) {
      // this.parentForm.getControl(this.controlName);
    }
  }

  public ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
