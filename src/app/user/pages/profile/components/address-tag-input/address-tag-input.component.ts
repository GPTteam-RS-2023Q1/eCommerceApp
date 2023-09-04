import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AbstractRajiControl } from '@app/shared/models/classes/abstract-raji-control';
import { Tag } from '@app/user/models/enums/tags.enum';
import { TUI_DEFAULT_MATCHER, tuiPure } from '@taiga-ui/cdk';
import { TuiMultiSelectComponent } from '@taiga-ui/kit';

const ITEMS: readonly Tag[] = Object.values(Tag);

@Component({
  selector: 'ec-address-tag-input',
  templateUrl: './address-tag-input.component.html',
  styleUrls: ['./address-tag-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressTagInputComponent),
      multi: true,
    },
  ],
})
export class AddressTagInputComponent
  extends AbstractRajiControl<string[]>
  implements AfterViewInit, OnDestroy
{
  public search: string | null = '';
  @ViewChild(TuiMultiSelectComponent)
  public multiSelectComponent!: TuiMultiSelectComponent<string[]>;
  public subs = new Subscription();

  @tuiPure
  public filter(search: string | null): readonly string[] {
    return ITEMS.filter((item) => TUI_DEFAULT_MATCHER(item, search || ''));
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
