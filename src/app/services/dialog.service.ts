import { Injectable } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ConfirmActionComponent } from '../modals/confirm-action/confirm-action.component';
import { FoodEntryInfoComponent } from '../modals/food-entry-info/food-entry-info.component';
import { FsFormInfoComponent } from '../modals/fs-form-info/fs-form-info.component';
import { PointAuthSwitchComponent } from '../modals/point-auth-switch/point-auth-switch.component';
import { FoodEntry } from '../models/food-entry.interface';
import { FormItem } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private modalController: ModalController, private alertController: AlertController, private toastController: ToastController) { }

  async confirm(message: string): Promise<boolean> {
    const modal = await this.modalController.create({
      component: ConfirmActionComponent,
      componentProps: { message }
    });
    await modal.present();
    const dismiss = await modal.onDidDismiss();

    return dismiss.data.confirm;
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // standard toast --
  async presentToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      cssClass: 'text-center text-tertiary font-base text-lg',
      color: 'light',
      position: 'top'
    });

    await toast.present();
  }

  // Form Info Modal
  async presentFormInfoModal(): Promise<boolean> {
    const modal = await this.modalController.create({
      component: FsFormInfoComponent,
    });
    await modal.present();
    await modal.onDidDismiss();

    return true;
  }

  // Food Entry Info Modal
  async presentFoodEntryInfoModal(item: FoodEntry, category: FormItem, origin: FormItem): Promise<boolean> {
    const modal = await this.modalController.create({
      component: FoodEntryInfoComponent,
      componentProps: { item, category, origin }
    });

    await modal.present();
    await modal.onDidDismiss();

    return true;
  }

  // Point Switch Modal
  async presentPointSwitchModal(): Promise<boolean> {
    const modal = await this.modalController.create({
      component: PointAuthSwitchComponent,
    });
    await modal.present();
    await modal.onDidDismiss();

    return true;
  }
}