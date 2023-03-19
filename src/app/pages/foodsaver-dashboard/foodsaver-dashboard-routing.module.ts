import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FoodsaverDashboardPage } from './foodsaver-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: FoodsaverDashboardPage,
  },
  {
    path: 'form',
    loadChildren: () => import('./tabs/foodsaver-form/foodsaver-form.module').then(m => m.FoodsaverFormPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./tabs/foodsaver-success/foodsaver-success.module').then(m => m.FoodsaverSuccessPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodsaverDashboardPageRoutingModule { }
