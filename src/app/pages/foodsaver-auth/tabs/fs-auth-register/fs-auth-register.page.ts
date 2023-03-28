import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
@Component({
  selector: 'app-fs-auth-register',
  templateUrl: './fs-auth-register.page.html',
  styleUrls: ['./fs-auth-register.page.scss'],
})
export class FsAuthRegisterPage implements OnInit {
  registerCredentials = this.fb.nonNullable.group({
    first_name: ['', [Validators.required, Validators.minLength(2)]],
    last_name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', Validators.required, Validators.email],
    privacyCheck: [false, Validators.requiredTrue],
    tel: [],
    foodsharing_id: [],
    password: ['standard'],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private dialogService: DialogService,
    private router: Router
  ) { }

  get first_name() {
    return this.registerCredentials.get('first_name');
  }

  get last_name() {
    return this.registerCredentials.get('last_name');
  }

  get email() {
    return this.registerCredentials.get('email');
  }

  get tel() {
    return this.registerCredentials.get('tel');
  }

  get foodsharing_id() {
    return this.registerCredentials.get('foodsharing_id');
  }
  get privacyCheck() {
    return this.registerCredentials.get('privacyCheck');
  }

  ngOnInit() {
  }

  async register(): Promise<void> {
    const loading = await this.loadingController.create();
    await loading.present();
    if (this.registerCredentials.get('first_name')?.value &&
      this.registerCredentials.get('last_name')?.value &&
      this.registerCredentials.get('email')?.value &&
      this.registerCredentials.get('privacyCheck')?.value === true
    ) {
      this.authService.registerUser(this.registerCredentials.getRawValue())
        .then(async (data) => {
          await loading.dismiss();
          this.router.navigateByUrl('point/foodsaver/dashboard');
          if (data['error']) {
            this.dialogService.showAlert(
              'Registrierung Fehlgeschlagen',
              'Bitte überprüfe deine Angaben. Für eine erfolgreiche Registrierung benötigen wir deinen Vor- und Nachnamen sowie eine gültige E-Mail-Adresse. Für die Foodsharing Wirkungsmessung, bitten wir dich die Datenschutzerklärung zu aktzeptieren. Fehlermeldung: '
              + data['error'].message
            );
          }
          this.registerCredentials.reset();
        });
    } else {
      await loading.dismiss();
      this.dialogService.showAlert(
        'Registrierung Fehlgeschlagen',
        'Bitte überprüfe deine Angaben. Für eine erfolgreiche Registrierung benötigen wir deinen Vor- und Nachnamen sowie eine gültige E-Mail-Adresse. Für die Foodsharing Wirkungsmessung, bitten wir dich die Datenschutzerklärung zu aktzeptieren.'
      );
    }
  }
}
