import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FsAuthLoginPage } from './fs-auth-login.page';

const routes: Routes = [
  {
    path: '',
    component: FsAuthLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FsAuthLoginPageRoutingModule {}
