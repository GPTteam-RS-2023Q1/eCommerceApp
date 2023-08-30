import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaskitoModule } from '@maskito/angular';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiHostedDropdownModule,
  TuiLinkModule,
  TuiNotificationModule,
  TuiSvgModule,
  TuiDialogModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiCarouselModule,
  TuiCheckboxLabeledModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiFilterByInputPipeModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandModule,
  TuiPaginationModule,
  TuiToggleModule,
  TuiTagModule,
  TuiAvatarModule,
  TuiMultiSelectModule,
} from '@taiga-ui/kit';

import { TuiTableModule } from '@taiga-ui/addon-table';

import { EmailInputComponent } from './components/email-input/email-input.component';
import { InputComponent } from './components/input/input.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { FormFailNotificationComponent } from './components/form-fail-notification/form-fail-notification.component';
import { AddressFormComponent } from './components/address-form/address-form.component';

@NgModule({
  declarations: [
    InputComponent,
    EmailInputComponent,
    PasswordInputComponent,
    FormFailNotificationComponent,
    AddressFormComponent,
  ],
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
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiFilterByInputPipeModule,
    TuiCheckboxLabeledModule,
    TuiLinkModule,
    TuiToggleModule,
    MaskitoModule,
    TuiHostedDropdownModule,
    TuiSvgModule,
    TuiCarouselModule,
    TuiIslandModule,
    TuiPaginationModule,
    TuiTableModule,
    TuiTagModule,
    TuiAvatarModule,
    TuiDialogModule,
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
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
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    InputComponent,
    EmailInputComponent,
    PasswordInputComponent,
    TuiFilterByInputPipeModule,
    TuiCheckboxLabeledModule,
    TuiToggleModule,
    TuiLinkModule,
    MaskitoModule,
    TuiHostedDropdownModule,
    TuiSvgModule,
    TuiCarouselModule,
    TuiIslandModule,
    TuiPaginationModule,
    TuiTableModule,
    TuiTagModule,
    TuiAvatarModule,
    TuiDialogModule,
    FormFailNotificationComponent,
    AddressFormComponent,
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
  ],
})
export class SharedModule {}
