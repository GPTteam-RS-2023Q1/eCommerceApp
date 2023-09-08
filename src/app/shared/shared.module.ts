import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaskitoModule } from '@maskito/angular';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiHostedDropdownModule,
  TuiLinkModule,
  TuiNotificationModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiAvatarModule,
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
  TuiMultiSelectModule,
  TuiPaginationModule,
  TuiSelectModule,
  TuiTagModule,
  TuiToggleModule,
} from '@taiga-ui/kit';

import { AddressFormComponent } from './components/address-form/address-form.component';
import { BirthdayInputComponent } from './components/birthday-input/birthday-input.component';
import { EmailInputComponent } from './components/email-input/email-input.component';
import { FormFailNotificationComponent } from './components/form-fail-notification/form-fail-notification.component';
import { InputComponent } from './components/input/input.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { ControlDependencyDirective } from './directives/control-dependency.directive';

@NgModule({
  declarations: [
    InputComponent,
    EmailInputComponent,
    PasswordInputComponent,
    FormFailNotificationComponent,
    AddressFormComponent,
    ControlDependencyDirective,
    BirthdayInputComponent,
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
    TuiSelectModule,
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
    TuiSelectModule,
    ControlDependencyDirective,
    BirthdayInputComponent,
  ],
})
export class SharedModule {}
