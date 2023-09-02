import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { CardComponent } from './components/card/card.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './pages/product/product.component';

@NgModule({
  declarations: [ProductsComponent, CardComponent, CatalogComponent, ProductComponent],
  imports: [
    CommonModule,
    SharedModule,
    CatalogRoutingModule,
    NgOptimizedImage,
    CoreModule,
  ],
})
export class CatalogModule {}
