import { NgModule } from '@angular/core';

import { HeaderComponent } from '../components/header/header.component';
import { FoodEntryComponent } from '../components/food-entry/food-entry.component';
import { FsFormItemComponent } from '../components/fs-form-item/fs-form-item.component';
import { ConfirmActionComponent } from '../modals/confirm-action/confirm-action.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FsFormInfoComponent } from '../modals/fs-form-info/fs-form-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FoodEntryInfoComponent } from '../modals/food-entry-info/food-entry-info.component';
import { PointAuthSwitchComponent } from '../modals/point-auth-switch/point-auth-switch.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent, FsFormInfoComponent, PointAuthSwitchComponent, FsFormItemComponent, ConfirmActionComponent, FoodEntryComponent, FsFormItemComponent, FoodEntryInfoComponent
  ],
  exports: [
    HeaderComponent, FsFormItemComponent, PointAuthSwitchComponent, ConfirmActionComponent, FoodEntryComponent, FsFormItemComponent, FoodEntryComponent, FoodEntryInfoComponent
  ],
})
export class SharedModule { }
