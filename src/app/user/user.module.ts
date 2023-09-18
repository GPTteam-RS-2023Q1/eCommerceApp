import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { TUI_VALIDATION_ERRORS, TuiInputNumberModule } from '@taiga-ui/kit';

import { CardBasketComponent } from './components/card-basket/card-basket.component';
import { CustomerAddressComponent } from './components/customer-addresses/customer-address/customer-address.component';
import { CustomerAddressesComponent } from './components/customer-addresses/customer-addresses.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { EditAddressDialogComponent } from './components/dialogs/edit-address-dialog/edit-address-dialog.component';
import { PasswordDialogComponent } from './components/dialogs/password-dialog/password-dialog.component';
import { UserInfoDialogComponent } from './components/dialogs/user-info-dialog/user-info-dialog.component';
import { DiscountInfoComponent } from './components/discount-info/discount-info.component';
import { DiscountInputComponent } from './components/discount-input/discount-input.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';
import { TagInputComponent } from './components/tag-input/tag-input.component';
import { TotalPriceComponent } from './components/total-price/total-price.component';
import { CartComponent } from './pages/cart/cart.component';
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
    OrderInfoComponent,
    DiscountInputComponent,
    TotalPriceComponent,
    CardBasketComponent,
    OrderInfoComponent,
    DiscountInputComponent,
    TotalPriceComponent,
    DiscountInfoComponent,
  ],
  imports: [SharedModule, UserRoutingModule, NgOptimizedImage, TuiInputNumberModule],
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
