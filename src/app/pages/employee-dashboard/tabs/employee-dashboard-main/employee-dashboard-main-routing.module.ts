import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeDashboardMainPage } from './employee-dashboard-main.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDashboardMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeDashboardMainPageRoutingModule {}
