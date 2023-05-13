import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-point-auth-switch',
  templateUrl: './point-auth-switch.component.html',
  styleUrls: ['./point-auth-switch.component.scss'],
})
export class PointAuthSwitchComponent implements OnInit {
  formData = this.fb.nonNullable.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private router: Router,
    private dialogService: DialogService,
    private authService: AuthService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() { }

  get email() {
    return this.formData.get('email');
  }
  get password() {
    return this.formData.get('password');
  }

  close(): void {
    this.modalController.dismiss();
  }

  async pointSwitch(): Promise<void> {
    const loading = await this.loadingController.create();
    await loading.present();
    const pointId = localStorage.getItem('pointId');
    if (this.formData.getRawValue().password === pointId) {
      this.authService
        .signInUser(this.formData.getRawValue())
        .then(async (data) => {
          await loading.dismiss();
          this.router.navigateByUrl('point/dashboard');
          if (data['error']) {
            this.dialogService.showAlert('Login Fehlgeschlagen', data['error'].message);
          }
          this.formData.reset();
        })
    } else {
      await loading.dismiss();
      this.dialogService.showAlert('Login fehlgeschlagen', 'Bitte überprüfe deine Eingabe');
    }
    this.modalController.dismiss();
  }
}
