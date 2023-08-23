import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { UserAddressComponent } from './pages/profile/components/user-address/user-address.component';

@NgModule({
  declarations: [CartComponent, ProfileComponent, UserAddressComponent],
  imports: [SharedModule, UserRoutingModule],
})
export class UserModule {}
