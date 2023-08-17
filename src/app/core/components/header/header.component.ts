import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { selectIsAuth } from '@app/ngrx/selectors/auth.selector';

@Component({
  selector: 'ec-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public isAuth!: Observable<boolean>;

  constructor(private router: Router, private store: Store) {}

  public ngOnInit(): void {
    this.isAuth = this.store.select(selectIsAuth);
  }

  public toMain(): void {
    this.router.navigate(['']);
  }

  public toCart(): void {
    this.router.navigate(['user/cart']);
  }
}
