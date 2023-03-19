import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeDashboardMainPageRoutingModule } from './employee-dashboard-main-routing.module';

import { EmployeeDashboardMainPage } from './employee-dashboard-main.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeDashboardMainPageRoutingModule,
    SharedModule
  ],
  declarations: [EmployeeDashboardMainPage]
})
export class EmployeeDashboardMainPageModule { }
