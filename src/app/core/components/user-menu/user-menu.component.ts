import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { authAction } from '@app/ngrx/actions/auth.actions';
import { LocalKey } from '@app/shared/models/localStorage.enun';
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

  constructor(private router: Router, private store: Store) {}

  public onClick(): void {
    this.open = false;
    this.component?.nativeFocusableElement?.focus();
  }

  public toProfile(): void {
    this.onClick();
    this.router.navigate(['user/profile']);
  }

  public logOut(): void {
    this.onClick();
    localStorage.removeItem(LocalKey.AuthData);
    this.store.dispatch(authAction.logOut());
    this.router.navigate(['store']);
  }
}
