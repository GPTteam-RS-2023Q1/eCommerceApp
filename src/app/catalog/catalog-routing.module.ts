import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogComponent } from './catalog.component';
import {
  categoryResolver,
  productResolver as productsResolver,
} from './guards/catalog.resolver';
import { ProductComponent } from './pages/product/product.component';
import { productResolver } from './resolvers/product.resolver';

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
