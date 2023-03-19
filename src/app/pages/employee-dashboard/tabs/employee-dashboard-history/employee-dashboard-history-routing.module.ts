import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeDashboardHistoryPage } from './employee-dashboard-history.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDashboardHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeDashboardHistoryPageRoutingModule {}
