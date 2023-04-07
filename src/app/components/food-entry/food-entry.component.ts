import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Comment } from 'src/app/modals/comment-form/comment-form.component';
import { FoodEntry } from 'src/app/models/food-entry.interface';
import { ShelfLifeString } from 'src/app/models/shelf-life';
import { DataService, FormItem } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';
import { FormService } from 'src/app/services/form.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-food-entry',
  templateUrl: './food-entry.component.html',
  styleUrls: ['./food-entry.component.scss'],
})
export class FoodEntryComponent implements OnInit {
  @Input() item!: FoodEntry;

  category!: FormItem;
  origin!: FormItem;
  shelfLife: ShelfLifeString[] = Object.values(ShelfLifeString);
  shelfLifeCheck = false;
  quantity!: FoodEntry['quantity'];

  comments: Comment[] = [];

  constructor(
    private dataService: DataService,
    private dialogService: DialogService,
    private formService: FormService,
    private warehouseService: WarehouseService,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkData();
    if (!this.router.url.includes('foodsaver')) {
      this.loadComments();
      this.warehouseService.listenCommentsChannel().subscribe((data) => {
        this.loadComments();
      });
    }
  }

  test(): void {}

  async checkData(): Promise<void> {
    // get catregory and origin
    this.category = await this.dataService.getCategorysById(
      this.item.category_id
    );
    this.origin = await this.dataService.getOriginsById(
      this.item.origin_category_id
    );

    const shelfLife = new Date(this.item.shelf_life);
    const currentDate = new Date();
    if (shelfLife < currentDate) {
      this.shelfLifeCheck = true;
    }
  }

  loadComments(): void {
    this.warehouseService
      .getComments(this.item?.id)
      .then((data) => {
        this.comments = data;
      })
      .catch((error) => {
        this.dialogService.showAlert('Ein Fehler ist aufgetreten', error);
      });
  }

  // modal functionality --
  async openFoodEntryInfo(): Promise<void> {
    this.dialogService.presentFoodEntryInfoModal(
      this.item,
      this.category,
      this.origin
    );
  }

  async openCommentForm(): Promise<void> {
    await this.dialogService.presentCommentForm(this.comments, this.item.id);
    this.loadComments();
  }

  // Food Entry CRUD --
  editEntry(): void {
    this.formService.editDeliveryItem(this.item);
  }

  deleteEntry(): void {
    this.formService.deleteDeliveryItem(this.item);
  }

  async distributeEntry(): Promise<void> {
    const loading = await this.loadingController.create();
    await loading.present();
    try {
      await this.warehouseService
        .checkoutData(this.item, 1, this.item.quantity)
        .then(async (result) => {
          await loading.dismiss();
          if (!result.message) {
            this.dialogService.presentToast('Checkout erfolgreich');
          } else {
            this.dialogService.showAlert(
              'Fehler',
              'Es ist ein Fehler aufgetreten. Details: ' + result.error
            );
          }
        });
    } catch (error) {
      this.dialogService.showAlert(
        'Fehler',
        'Es ist ein Fehler aufgetreten. Details: ' + error
      );
    }
  }

  async disposeEntry(): Promise<void> {
    const loading = await this.loadingController.create();
    await loading.present();
    try {
      await this.warehouseService
        .checkoutData(this.item, 2, this.item.quantity)
        .then(async (result) => {
          await loading.dismiss();
          if (!result.message) {
            this.dialogService.presentToast('Checkout erfolgreich');
          } else {
            this.dialogService.showAlert(
              'Fehler',
              'Es ist ein Fehler aufgetreten. Details: ' + result.error
            );
          }
        });
    } catch (error) {
      this.dialogService.showAlert(
        'Fehler',
        'Es ist ein Fehler aufgetreten. Details: ' + error
      );
    }
  }
}
