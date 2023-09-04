import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiInputRangeModule, TuiMultiSelectModule, TuiTreeModule } from '@taiga-ui/kit';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { CardComponent } from './components/card/card.component';
import { CarouselImgComponent } from './components/carousel-img/carousel-img.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { TreeItemComponent } from './components/categories/tree-item/tree-item.component';
import { FilterModalComponent } from './components/filter-modal/filter-modal.component';
import { FilterMultiSelectComponent } from './components/filter-multi-select/filter-multi-select.component';
import { FiltersComponent } from './components/filters/filters.component';
import { PriceInputComponent } from './components/price-input/price-input.component';
import { ProductsComponent } from './components/products/products.component';
import { SearchComponent } from './components/search/search.component';
import { ProductComponent } from './pages/product/product.component';
import { SortComponent } from './components/sort/sort.component';

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
    SearchComponent,
    FilterMultiSelectComponent,
    PriceInputComponent,
    FilterModalComponent,
    SortComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CatalogRoutingModule,
    NgOptimizedImage,
    CoreModule,
    TuiTreeModule,
    TuiLoaderModule,
    TuiMultiSelectModule,
    TuiLetModule,
    TuiInputRangeModule,
  ],
})
export class CatalogModule {}
