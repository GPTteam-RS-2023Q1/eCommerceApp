import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthFailComponent } from './components/auth-fail/auth-fail.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

@NgModule({
  declarations: [
    SignUpFormComponent,
    SignUpComponent,
    SignInComponent,
    SignInFormComponent,
    AuthFailComponent,
  ],
  imports: [SharedModule, AuthRoutingModule],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Заполните поле',
      },
    },
  ],
})
export class AuthModule {}
