import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { FoodEntry } from 'src/app/models/food-entry.interface';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-foodsaver-dashboard',
  templateUrl: './foodsaver-dashboard.page.html',
  styleUrls: ['./foodsaver-dashboard.page.scss'],
})
export class FoodsaverDashboardPage implements OnInit {
  deliveryItems: FoodEntry[] = [];

  constructor(
    private authService: AuthService,
    private formService: FormService,
    private router: Router,
    private loadingController: LoadingController,
    private dialogService: DialogService,
  ) {
    this.authService.getCurrentUser().subscribe(async (user) => {
      if (user && !(await this.authService.isCurrentPointOwner()).valueOf()) {
        this.authService.getUserData().then((data) => {
          this.dialogService.presentToast(
            'Hallo ' +
            data?.['data']?.first_name +
            '! Wir freuen uns, dass Du dabei bist!'
          );
        });
      }
    });
  }

  ngOnInit() {
    this.getDeliveryItems();
  }

  // list data -----
  private getDeliveryItems(): void {
    this.formService.getCurrentDeliveries().subscribe((items) => {
      if (items) {
        this.deliveryItems = items;
      }
    });
  }

  // form actions -----
  async cancelDelivery(): Promise<void> {
    const result = await this.dialogService.confirm(
      'Bist du sicher, dass du deine Lieferung abbrechen möchtest?'
    );
    if (result && !(await this.authService.isCurrentPointOwner()).valueOf()) {
      await this.authService.signOutUser().then(() => {
        this.formService.clearDeliveries();
        this.router.navigateByUrl('point/foodsaver');
      });
    } else {
      this.router.navigateByUrl('point/dashboard');
    }
  }

  async submitDelivery(): Promise<void> {
    const loading = await this.loadingController.create();
    await loading.present();
    try {
      const data = await this.formService.submitDelivery();
      if (data[0].message) {
        this.dialogService.showAlert('Fehler', data[0].message);
      } else {
        this.router.navigateByUrl('/point/foodsaver/dashboard/success');
      }
    } finally {
      await loading.dismiss();
    }
  }

  // modal & route actions -----
  openInfoModal(): void {
    this.dialogService.presentFormInfoModal();
  }
}
