import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FoodEntry } from 'src/app/models/food-entry.interface';
import { ShelfLifeDates } from 'src/app/models/shelf-life';
import { FormItem } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';
import { FormService } from 'src/app/services/form.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-food-entry-info',
  templateUrl: './food-entry-info.component.html',
  styleUrls: ['./food-entry-info.component.scss'],
})
export class FoodEntryInfoComponent implements OnInit {
  @Input() item!: FoodEntry;
  @Input() category!: FormItem;
  @Input() origin!: FormItem;

  shelfLife: Date[] = Object.values(ShelfLifeDates);

  // form fields -------
  formData = this.fb.nonNullable.group({
    quantity: [0, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  });

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private warehouseService: WarehouseService,
    private modalController: ModalController,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.formData.controls['quantity'].setValue(this.item.quantity);
  }

  get quantity() {
    return this.formData.get('quantity');
  }

  close() {
    this.modalController.dismiss();
  }

  editEntry() {
    this.modalController.dismiss();
    this.formService.editDeliveryItem(this.item);
  }

  deleteEntry() {
    this.modalController.dismiss();
    this.formService.deleteDeliveryItem(this.item);
  }

  // warehouse
  distributeEntry(): void {
    this.modalController.dismiss();
    this.dialogService.confirm('Möchtest du wirklich ' + this.formData.getRawValue().quantity + ' kg des Lebensmittel ' + this.item.title + ' fairteilen?')
      .then(async (result) => {
        if (result) {
          try {
            const result = await this.warehouseService.checkoutData(this.item, 1, this.formData.getRawValue().quantity);
            if (!result.message) {
              this.dialogService.presentToast('Checkout erfolgreich');
            } else {
              this.dialogService.showAlert('Fehler', 'Es ist ein Fehler aufgetreten. Details: ' + result.message);
            }
          } catch (error) {
            this.dialogService.showAlert('Fehler', 'Es ist ein Fehler aufgetreten. Details: ' + error + '');
          }
        }
      });
  }

  disposeEntry(): void {
    this.modalController.dismiss();
    this.dialogService.confirm('Möchtest du wirklich ' + this.formData.getRawValue().quantity + ' kg des Lebensmittel ' + this.item.title + ' entsorgen?')
      .then(async (result) => {
        if (result) {
          try {
            const result = await this.warehouseService.checkoutData(this.item, 2, this.formData.getRawValue().quantity);
            if (!result.message) {
              this.dialogService.presentToast('Checkout erfolgreich');
            } else {
              this.dialogService.showAlert('Fehler', 'Es ist ein Fehler aufgetreten. Details: ' + result.message);
            }
          } catch (error) {
            this.dialogService.showAlert('Fehler', 'Es ist ein Fehler aufgetreten. Details: ' + error);
          }
        }
      });
  }

}
