import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAccessToken } from '@app/ngrx/selectors/auth.selector';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  private accessToken$: Observable<string | null>;
  constructor(private store: Store) {
    this.accessToken$ = this.store.select(selectAccessToken);
  }
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.accessToken$.pipe(
      take(1),
      exhaustMap((accessToken) => {
        if (req.headers.has('Authorization')) {
          return next.handle(req);
        }
        const modifReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
        });
        return next.handle(modifReq);
      })
    );
  }
}
