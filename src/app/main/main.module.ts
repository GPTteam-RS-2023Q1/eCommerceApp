import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TuiButtonModule } from '@taiga-ui/core';
import { TuiCarouselModule, TuiIslandModule, TuiPaginationModule } from '@taiga-ui/kit';

import { MaimRoutingModule } from './main-routing.module';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [MainComponent, CatalogComponent],
  imports: [
    CommonModule,
    MaimRoutingModule,
    TuiCarouselModule,
    TuiIslandModule,
    TuiPaginationModule,
    TuiButtonModule,
  ],
})
export class MainModule {}
