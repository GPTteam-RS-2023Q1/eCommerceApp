import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TuiHostedDropdownComponent } from '@taiga-ui/core';

@Component({
  selector: 'ec-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent {
  @ViewChild(TuiHostedDropdownComponent)
  public component?: TuiHostedDropdownComponent;

  public open = false;

  public userName = 'user';

  constructor(private router: Router) {}

  public onClick(): void {
    this.open = false;
    this.component?.nativeFocusableElement?.focus();
  }

  public toProfile(): void {
    this.onClick();
    this.router.navigate(['user/profile']);
  }
}
