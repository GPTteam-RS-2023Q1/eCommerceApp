import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { TuiTreeModule } from '@taiga-ui/kit';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { CardComponent } from './components/card/card.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ProductsComponent } from './components/products/products.component';
import { TreeItemComponent } from './components/categories/tree-item/tree-item.component';

@NgModule({
  declarations: [
    ProductsComponent,
    CardComponent,
    CatalogComponent,
    FiltersComponent,
    CategoriesComponent,
    TreeItemComponent,
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
