import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeDashboardHistoryPageRoutingModule } from './employee-dashboard-history-routing.module';

import { EmployeeDashboardHistoryPage } from './employee-dashboard-history.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeDashboardHistoryPageRoutingModule,
    SharedModule
  ],
  declarations: [EmployeeDashboardHistoryPage]
})
export class EmployeeDashboardHistoryPageModule { }
