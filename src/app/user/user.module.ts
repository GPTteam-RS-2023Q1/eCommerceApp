import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { CustomerAddressesComponent } from './pages/profile/components/customer-addresses/customer-addresses.component';
import { CustomerAddressComponent } from './pages/profile/components/customer-addresses/customer-address/customer-address.component';
import { CustomerInfoComponent } from './pages/profile/components/customer-info/customer-info.component';
import { PasswordDialogComponent } from './pages/profile/components/dialogs/password-dialog/password-dialog.component';
import { UserInfoDialogComponent } from './pages/profile/components/dialogs/user-info-dialog/user-info-dialog.component';

@NgModule({
  declarations: [
    CartComponent,
    ProfileComponent,
    CustomerAddressesComponent,
    CustomerAddressComponent,
    CustomerInfoComponent,
    PasswordDialogComponent,
    UserInfoDialogComponent,
  ],
  imports: [SharedModule, UserRoutingModule],
})
export class UserModule {}
