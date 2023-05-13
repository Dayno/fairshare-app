import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeDashboardPage } from './employee-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDashboardPage,
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      },
      {
        path: 'main',
        loadChildren: () => import('./tabs/employee-dashboard-main/employee-dashboard-main.module').then(m => m.EmployeeDashboardMainPageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('./tabs/employee-dashboard-history/employee-dashboard-history.module').then(m => m.EmployeeDashboardHistoryPageModule)
      },
      {
        path: 'delivery',
        loadChildren: () => import('../foodsaver-dashboard/foodsaver-dashboard.module').then(m => m.FoodsaverDashboardPageModule)
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeDashboardPageRoutingModule { }
