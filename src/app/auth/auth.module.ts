import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import {
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/kit';

import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

@NgModule({
  declarations: [RegistrationFormComponent, SignUpComponent, SignInComponent],
  imports: [
    SharedModule,
    AuthRoutingModule,
    TuiInputModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    TuiInputPasswordModule,
    TuiInputDateModule,
    TuiButtonModule,
  ],
})
export class AuthModule {}
