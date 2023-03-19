import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeGuard } from 'src/app/guards/employee.guard';
import { FoodsaverGuard } from 'src/app/guards/foodsaver.guard';
import { PointGuard } from 'src/app/guards/point.guard';

import { PointAuthPage } from './point-auth.page';

const routes: Routes = [
  {
    path: '',
    component: PointAuthPage,
  },
  {
    path: 'foodsaver',
    redirectTo: 'foodsaver/auth',
    pathMatch: 'full'
  },
  {
    path: 'foodsaver/auth',
    canActivate: [PointGuard],
    loadChildren: () => import('../foodsaver-auth/foodsaver-auth.module').then(m => m.FoodsaverAuthPageModule)
  },
  {
    path: 'foodsaver/dashboard',
    canActivate: [FoodsaverGuard],
    loadChildren: () => import('../foodsaver-dashboard/foodsaver-dashboard.module').then(m => m.FoodsaverDashboardPageModule)
  },
  {
    path: 'dashboard',
    canActivate: [EmployeeGuard],
    loadChildren: () => import('../employee-dashboard/employee-dashboard.module').then(m => m.EmployeeDashboardPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointAuthPageRoutingModule { }
