import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [CartComponent, ProfileComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
