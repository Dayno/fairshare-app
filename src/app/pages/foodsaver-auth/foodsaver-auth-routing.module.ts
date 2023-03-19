import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodsaverAuthPage } from './foodsaver-auth.page';

const routes: Routes = [
  {
    path: '',
    component: FoodsaverAuthPage,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: () => import('./tabs/fs-auth-login/fs-auth-login.module').then(m => m.FsAuthLoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./tabs/fs-auth-register/fs-auth-register.module').then(m => m.FsAuthRegisterPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodsaverAuthPageRoutingModule { }
