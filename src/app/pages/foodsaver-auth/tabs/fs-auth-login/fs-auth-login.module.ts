import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FsAuthLoginPageRoutingModule } from './fs-auth-login-routing.module';

import { FsAuthLoginPage } from './fs-auth-login.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FsAuthLoginPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [FsAuthLoginPage]
})
export class FsAuthLoginPageModule { }
