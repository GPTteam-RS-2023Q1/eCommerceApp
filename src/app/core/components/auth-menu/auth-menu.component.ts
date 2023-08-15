import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TuiHostedDropdownComponent } from '@taiga-ui/core';

@Component({
  selector: 'ec-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthMenuComponent {
  @ViewChild(TuiHostedDropdownComponent)
  public component?: TuiHostedDropdownComponent;

  public open = false;

  constructor(private router: Router) {}

  public onClick(): void {
    this.open = false;
    this.component?.nativeFocusableElement?.focus();
  }

  public toSignIn(): void {
    this.onClick();
    this.router.navigate(['auth/sign-in']);
  }

  public toSignUp(): void {
    this.onClick();
    this.router.navigate(['auth/sign-up']);
  }
}
