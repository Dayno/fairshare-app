import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-fs-auth-login',
  templateUrl: './fs-auth-login.page.html',
  styleUrls: ['./fs-auth-login.page.scss'],
})
export class FsAuthLoginPage implements OnInit {
  credentials = this.fb.nonNullable.group({
    email: ['', Validators.email],
    tel: [Validators.min(0)],
    password: ['standard'],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private dialogService: DialogService,
  ) { }

  get email() {
    return this.credentials.get('email');
  }
  get tel() {
    return this.credentials.get('tel');
  }
  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() { }

  async login(): Promise<void> {
    const loading = await this.loadingController.create();
    await loading.present();

    if (!this.credentials.getRawValue().email) {
      this.authService
        .getUserEmail(this.credentials.getRawValue().tel)
        .then(async (email) => {
          this.authService
            .signInUser({ email: email, password: this.credentials.getRawValue().password })
            .then(async (data) => {
              await loading.dismiss();
              if (data['error']) {
                this.dialogService.showAlert('Login Fehlgeschlagen', data['error'].message);
              }
            })
        })
        .catch(async (error) => {
          await loading.dismiss();
          this.dialogService.showAlert('Login Fehlgeschlagen', error.message);
        })
    } else {
      this.authService
        .signInUser(this.credentials.getRawValue())
        .then(async (data) => {
          await loading.dismiss();
          if (data['error']) {
            this.dialogService.showAlert('Login Fehlgeschlagen', data['error'].message);
          }
        })
    }
  }
}
