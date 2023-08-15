import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaskitoModule } from '@maskito/angular';
import { TuiButtonModule, TuiDataListModule, TuiErrorModule } from '@taiga-ui/core';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiFilterByInputPipeModule,
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
    ReactiveFormsModule,
    TuiInputModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    TuiInputPasswordModule,
    TuiInputDateModule,
    TuiButtonModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiFilterByInputPipeModule,
    MaskitoModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    TuiInputPasswordModule,
    TuiInputDateModule,
    TuiButtonModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    InputComponent,
    EmailInputComponent,
    PasswordInputComponent,
    TuiFilterByInputPipeModule,
    MaskitoModule,
  ],
})
export class SharedModule {}
