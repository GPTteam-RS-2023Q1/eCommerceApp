import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { TuiExpandModule } from '@taiga-ui/core';
import { TuiBadgedContentModule } from '@taiga-ui/kit';

import { AuthMenuComponent } from './components/auth-menu/auth-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
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
    NotificationsComponent,
  ],
  imports: [CommonModule, SharedModule, TuiBadgedContentModule, TuiExpandModule],
  exports: [HeaderComponent, FooterComponent, NotificationsComponent],
})
export class CoreModule {}
