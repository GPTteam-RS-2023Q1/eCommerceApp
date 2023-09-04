import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractRajiControl } from '@app/shared/models/classes/abstract-raji-control';
import { TuiInputRangeComponent } from '@taiga-ui/kit';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ec-price-input',
  templateUrl: './price-input.component.html',
  styleUrls: ['./price-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PriceInputComponent),
      multi: true,
    },
  ],
})
export class PriceInputComponent
  extends AbstractRajiControl<[number, number]>
  implements AfterViewInit, OnDestroy
{
  @ViewChild(TuiInputRangeComponent) public input!: TuiInputRangeComponent;
  public subs = new Subscription();
  public pluralize = { one: '$', other: '$' };
  @Input({ required: true }) public max!: number;
  @Input({ required: true }) public min!: number;

  public ngAfterViewInit(): void {
    this.input.nativeFocusableElement?.addEventListener('blur', () => {
      this.onChange(this.control.value);
      this.onTouch();
    });

    this.subs.add(
      this.control.valueChanges.subscribe((value) => {
        this.onChange(value);
      })
    );
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
