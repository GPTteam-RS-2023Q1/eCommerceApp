import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { CardComponent } from './components/card/card.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [ProductsComponent, CardComponent, CatalogComponent],
  imports: [CommonModule, SharedModule, CatalogRoutingModule, NgOptimizedImage],
})
export class CatalogModule {}
