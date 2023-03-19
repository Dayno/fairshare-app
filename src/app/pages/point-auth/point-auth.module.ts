import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointAuthPageRoutingModule } from './point-auth-routing.module';

import { PointAuthPage } from './point-auth.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointAuthPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [PointAuthPage]
})
export class PointAuthPageModule { }
