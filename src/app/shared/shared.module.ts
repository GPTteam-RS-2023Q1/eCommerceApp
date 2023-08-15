import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TuiButtonModule, TuiErrorModule, TuiNotificationModule } from '@taiga-ui/core';
import {
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/kit';

import { EmailInputComponent } from './components/email-input/email-input.component';
import { InputComponent } from './components/input/input.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';

@NgModule({
  declarations: [InputComponent, EmailInputComponent, PasswordInputComponent],
  imports: [
    CommonModule,
    TuiNotificationModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    TuiInputPasswordModule,
    TuiInputDateModule,
    TuiButtonModule,
  ],
  exports: [
    CommonModule,
    TuiNotificationModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    TuiInputPasswordModule,
    TuiInputDateModule,
    TuiButtonModule,
    InputComponent,
    EmailInputComponent,
    PasswordInputComponent,
  ],
})
export class SharedModule {}
