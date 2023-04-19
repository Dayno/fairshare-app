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
import { CommentFormComponent } from '../modals/comment-form/comment-form.component';
import { HistoryEntryComponent } from '../components/history-entry/history-entry.component';
import { StatusComponent } from '../components/status/status.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent,
    FsFormInfoComponent,
    PointAuthSwitchComponent,
    FsFormItemComponent,
    ConfirmActionComponent,
    FoodEntryComponent,
    FsFormItemComponent,
    FoodEntryInfoComponent,
    CommentFormComponent,
    HistoryEntryComponent,
    StatusComponent
  ],
  exports: [
    HeaderComponent,
    FsFormItemComponent,
    PointAuthSwitchComponent,
    ConfirmActionComponent,
    FoodEntryComponent,
    FsFormItemComponent,
    FoodEntryComponent,
    FoodEntryInfoComponent,
    CommentFormComponent,
    HistoryEntryComponent,
    StatusComponent
  ],
})
export class SharedModule { }
