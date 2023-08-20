import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiDialogModule,
  TuiRootModule,
} from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

import { Actions, ofType } from '@ngrx/effects';
import { firstValueFrom } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth.interceptor';
import { CoreModule } from './core/core.module';
import { AppStoreModule } from './ngrx/store.module';
import { AuthService } from './auth/services/auth.service';
import { authAction } from './ngrx/actions/auth.actions';

function initAutoLogin(): () => Promise<void> {
  const actions$ = inject(Actions);
  const authService = inject(AuthService);

  return () => {
    authService.autoLogin(localStorage.getItem('authData'));
    return firstValueFrom(
      actions$.pipe(
        ofType(authAction.tokenSuccess, authAction.getCustomer, authAction.authFail)
      )
    );
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AppStoreModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initAutoLogin,
      deps: [Actions, AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
