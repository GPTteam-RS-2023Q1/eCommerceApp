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
import { AddressFormComponent } from './components/address-form/address-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { ControlDependencyDirective } from './directives/control-dependency.directive';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

@NgModule({
  declarations: [
    SignUpFormComponent,
    SignUpComponent,
    SignInComponent,
    ControlDependencyDirective,
    AddressFormComponent,
  ],
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
