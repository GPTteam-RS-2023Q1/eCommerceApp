import {
  ChangeDetectionStrategy,
  forwardRef,
  Component,
  AfterViewInit,
  ViewChild,
  OnDestroy,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractRajiControl } from '@app/shared/models/classes/abstract-raji-control';
import { TUI_DEFAULT_MATCHER, tuiPure } from '@taiga-ui/cdk';
import { TuiMultiSelectComponent } from '@taiga-ui/kit';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ec-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagInputComponent),
      multi: true,
    },
  ],
})
export class TagInputComponent
  extends AbstractRajiControl<string[]>
  implements AfterViewInit, OnDestroy
{
  @Input({ required: true }) public items!: string[];
  public search: string | null = '';
  @ViewChild(TuiMultiSelectComponent)
  public multiSelectComponent!: TuiMultiSelectComponent<string[]>;
  public subs = new Subscription();

  @tuiPure
  public filter(search: string | null): readonly string[] {
    return this.items.filter((item) => TUI_DEFAULT_MATCHER(item, search || ''));
  }

  public ngAfterViewInit(): void {
    this.multiSelectComponent.nativeFocusableElement?.addEventListener('blur', () => {
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
