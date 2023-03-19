import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodsaverDashboardPageRoutingModule } from './foodsaver-dashboard-routing.module';

import { FoodsaverDashboardPage } from './foodsaver-dashboard.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodsaverDashboardPageRoutingModule,
    SharedModule
  ],
  declarations: [FoodsaverDashboardPage]
})
export class FoodsaverDashboardPageModule { }
