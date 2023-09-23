import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  categoryResolver,
  productResolver,
  productsResolver,
} from './guards/catalog.resolver';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
  {
    path: ':category/:id',
    component: ProductComponent,
    resolve: { product: productResolver },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'clothes',
  },
  {
    path: ':category',
    component: CatalogComponent,
    resolve: { category: categoryResolver, product: productsResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
