import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';

import { map, Observable } from 'rxjs';

import { selectIsAuth } from '@app/ngrx/selectors/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private store: Store) {}

  private canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(selectIsAuth).pipe(
      map((isAuth) => {
        if (isAuth) {
          this.router.navigate(['store']);
        }
        return !isAuth;
      })
    );
  }
}
