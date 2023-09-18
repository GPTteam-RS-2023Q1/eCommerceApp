import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { canActivateCart } from './guard/cart.guard';
import { ProfileGuard } from './guard/profile.guard';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: 'user',
    redirectTo: 'cart',
    pathMatch: 'full',
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [canActivateCart],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ProfileGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
