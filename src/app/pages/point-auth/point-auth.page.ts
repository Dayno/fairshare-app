import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-point-auth',
  templateUrl: './point-auth.page.html',
  styleUrls: ['./point-auth.page.scss'],
})
export class PointAuthPage implements OnInit {
  credentials = this.fb.nonNullable.group({
    pointId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private dialogService: DialogService,
    private router: Router,
  ) {
    this.authService.getLocalPointId().subscribe((point) => {
      if (point) {
        this.router.navigateByUrl('/point/foodsaver/auth', { replaceUrl: true });
      }
    });
  }

  get pointId() {
    return this.credentials.get('pointId');
  }

  ngOnInit() { }

  async unlockTab(): Promise<void> {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService
      .pointSignIn(this.credentials.getRawValue().pointId)
      .then(async (result) => {
        await loading.dismiss();
        if (result === true) {
          this.router.navigateByUrl('/point/foodsaver/auth', { replaceUrl: true });
        } else {
          this.dialogService.showAlert('Login Fehlgeschlagen', 'Point ID nicht gefunden');
        }
      });
  }
}
