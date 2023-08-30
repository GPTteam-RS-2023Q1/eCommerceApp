import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { MaimRoutingModule } from './main-routing.module';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MaimRoutingModule, SharedModule],
})
export class MainModule {}
