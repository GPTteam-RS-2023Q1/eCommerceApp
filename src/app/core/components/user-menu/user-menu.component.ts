import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { authAction } from '@app/ngrx/actions/auth.actions';
import { selectUserName } from '@app/ngrx/selectors/auth.selector';
import { LocalKey } from '@app/shared/models/localStorage.enun';
import { TuiHostedDropdownComponent } from '@taiga-ui/core';

@Component({
  selector: 'ec-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent implements OnInit {
  @ViewChild(TuiHostedDropdownComponent)
  public component?: TuiHostedDropdownComponent;

  @Input() public sizeInput!: 's' | 'm';

  public open = false;

  public userName!: Observable<string>;

  constructor(private router: Router, private store: Store) {}

  public ngOnInit(): void {
    this.userName = this.store.select(selectUserName);
  }

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
