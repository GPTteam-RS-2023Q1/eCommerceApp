import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { ControlDependencyDirective } from './directives/control-dependency.directive';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthFailComponent } from './components/auth-fail/auth-fail.component';

@NgModule({
  declarations: [
    SignUpFormComponent,
    SignUpComponent,
    SignInComponent,
    SignInFormComponent,
    ControlDependencyDirective,
    AddressFormComponent,
    AuthFailComponent,
  ],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
