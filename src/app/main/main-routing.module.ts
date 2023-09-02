import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { categoryResolver } from '@app/catalog/guards/catalog.resolver';

import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'catalog',
    loadChildren: () => import('../catalog/catalog.module').then((m) => m.CatalogModule),
    resolve: { category: categoryResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaimRoutingModule {}
