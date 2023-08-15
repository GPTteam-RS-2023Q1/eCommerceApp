import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
} from '@taiga-ui/core';

import { AuthMenuComponent } from './components/auth-menu/auth-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
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
  ],
  imports: [CommonModule, TuiHostedDropdownModule, TuiDataListModule, TuiButtonModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
