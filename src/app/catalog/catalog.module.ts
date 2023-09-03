import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { TuiTreeModule } from '@taiga-ui/kit';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { CardComponent } from './components/card/card.component';
import { CarouselImgComponent } from './components/carousel-img/carousel-img.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { TreeItemComponent } from './components/categories/tree-item/tree-item.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './pages/product/product.component';

@NgModule({
  declarations: [
    ProductsComponent,
    CardComponent,
    CatalogComponent,
    CategoriesComponent,
    TreeItemComponent,
    ProductComponent,
    CarouselImgComponent,
    FiltersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CatalogRoutingModule,
    NgOptimizedImage,
    CoreModule,
    TuiTreeModule,
  ],
})
export class CatalogModule {}
