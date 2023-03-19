import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodsaverFormPage } from './foodsaver-form.page';

const routes: Routes = [
  {
    path: '',
    component: FoodsaverFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodsaverFormPageRoutingModule { }
