import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FsAuthRegisterPageRoutingModule } from './fs-auth-register-routing.module';

import { FsAuthRegisterPage } from './fs-auth-register.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FsAuthRegisterPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [FsAuthRegisterPage]
})
export class FsAuthRegisterPageModule { }
