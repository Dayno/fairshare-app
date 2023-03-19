import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FsAuthRegisterPage } from './fs-auth-register.page';

const routes: Routes = [
  {
    path: '',
    component: FsAuthRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FsAuthRegisterPageRoutingModule {}
