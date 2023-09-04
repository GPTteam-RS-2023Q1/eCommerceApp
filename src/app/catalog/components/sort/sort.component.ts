import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private router: Router, private route: ActivatedRoute) {}

  public onClick(): void {
    this.open = false;
    this.component?.nativeFocusableElement?.focus();
  }

  public priceAsc(): void {
    this.onClick();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: 'price:asc' },
      queryParamsHandling: 'merge',
    });
  }

  public priceDesc(): void {
    this.onClick();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: 'price:desc' },
      queryParamsHandling: 'merge',
    });
  }

  public nameAsc(): void {
    this.onClick();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: 'name:asc' },
      queryParamsHandling: 'merge',
    });
  }

  public nameDesc(): void {
    this.onClick();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: 'name:desc' },
      queryParamsHandling: 'merge',
    });
  }
}
