import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodsaverSuccessPageRoutingModule } from './foodsaver-success-routing.module';

import { FoodsaverSuccessPage } from './foodsaver-success.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodsaverSuccessPageRoutingModule,
    SharedModule
  ],
  declarations: [FoodsaverSuccessPage]
})
export class FoodsaverSuccessPageModule { }
