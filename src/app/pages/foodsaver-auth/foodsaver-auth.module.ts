import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodsaverAuthPageRoutingModule } from './foodsaver-auth-routing.module';

import { FoodsaverAuthPage } from './foodsaver-auth.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodsaverAuthPageRoutingModule,
    SharedModule
  ],
  declarations: [FoodsaverAuthPage]
})
export class FoodsaverAuthPageModule { }
