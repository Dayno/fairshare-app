import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodsaverFormPageRoutingModule } from './foodsaver-form-routing.module';

import { FoodsaverFormPage } from './foodsaver-form.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodsaverFormPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [FoodsaverFormPage]
})
export class FoodsaverFormPageModule { }
