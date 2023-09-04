import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { AuthMenuComponent } from './components/auth-menu/auth-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PriceComponent } from './components/price/price.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent,
    UserMenuComponent,
    AuthMenuComponent,
    FooterComponent,
    AboutComponent,
    PriceComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent, FooterComponent, PriceComponent],
})
export class CoreModule {}
