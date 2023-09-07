import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

import { CartComponent } from './pages/cart/cart.component';
import { CustomerAddressComponent } from './pages/profile/components/customer-addresses/customer-address/customer-address.component';
import { CustomerAddressesComponent } from './pages/profile/components/customer-addresses/customer-addresses.component';
import { CustomerInfoComponent } from './pages/profile/components/customer-info/customer-info.component';
import { EditAddressDialogComponent } from './pages/profile/components/dialogs/edit-address-dialog/edit-address-dialog.component';
import { PasswordDialogComponent } from './pages/profile/components/dialogs/password-dialog/password-dialog.component';
import { UserInfoDialogComponent } from './pages/profile/components/dialogs/user-info-dialog/user-info-dialog.component';
import { TagInputComponent } from './pages/profile/components/tag-input/tag-input.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    CartComponent,
    ProfileComponent,
    CustomerAddressesComponent,
    CustomerAddressComponent,
    CustomerInfoComponent,
    PasswordDialogComponent,
    UserInfoDialogComponent,
    EditAddressDialogComponent,
    UserInfoDialogComponent,
    TagInputComponent,
  ],
  imports: [SharedModule, UserRoutingModule],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Заполните поле',
      },
    },
  ],
})
export class UserModule {}
