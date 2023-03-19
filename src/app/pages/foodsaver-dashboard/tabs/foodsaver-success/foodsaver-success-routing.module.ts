import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodsaverSuccessPage } from './foodsaver-success.page';

const routes: Routes = [
  {
    path: '',
    component: FoodsaverSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodsaverSuccessPageRoutingModule {}
