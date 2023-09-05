import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TuiHostedDropdownComponent } from '@taiga-ui/core';

@Component({
  selector: 'ec-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortComponent {
  @ViewChild(TuiHostedDropdownComponent)
  public component?: TuiHostedDropdownComponent;

  public open = false;

  public items = [
    { text: 'По возрастанию цены', sort: 'price:asc' },
    { text: 'По убыванию цены', sort: 'price:desc' },
    { text: 'В алфавитном порядке', sort: 'name:asc' },
    { text: 'В обратном алфавитном порядке', sort: 'name:desc' },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  public selectMode(sort: string): void {
    this.open = false;
    this.component?.nativeFocusableElement?.focus();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort },
      queryParamsHandling: 'merge',
    });
  }
}
