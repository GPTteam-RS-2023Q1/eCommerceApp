import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { selectIsAuth } from '@app/ngrx/selectors/auth.selector';
import { selectCountCartItem } from '@app/ngrx/selectors/cart.selector';

@Component({
  selector: 'ec-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public size!: 's' | 'm';

  public isAuth!: Observable<boolean>;

  public countCartItem!: Observable<number | undefined>;

  constructor(private router: Router, private store: Store) {
    this.getSize();
  }

  public ngOnInit(): void {
    this.isAuth = this.store.select(selectIsAuth);
    this.countCartItem = this.store.select(selectCountCartItem);
  }

  @HostListener('window:resize')
  public onResize(): void {
    this.getSize();
  }

  private getSize(): void {
    this.size = window.innerWidth < 1024 ? 's' : 'm';
  }

  public toMain(): void {
    this.router.navigate(['']);
  }

  public toCatalog(): void {
    this.router.navigate(['store/catalog']);
  }

  public toCart(): void {
    this.router.navigate(['user/cart']);
  }

  public toAbout(): void {
    this.router.navigate(['about']);
  }
}
