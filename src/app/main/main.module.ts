import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { MaimRoutingModule } from './main-routing.module';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [MainComponent, CatalogComponent],
  imports: [CommonModule, MaimRoutingModule, SharedModule],
})
export class MainModule {}
