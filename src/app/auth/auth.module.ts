import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

@NgModule({
  declarations: [RegistrationFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AuthModule {}
