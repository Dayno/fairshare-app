import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FoodEntry } from 'src/app/models/food-entry.interface';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-employee-dashboard-main',
  templateUrl: './employee-dashboard-main.page.html',
  styleUrls: ['./employee-dashboard-main.page.scss'],
})
export class EmployeeDashboardMainPage implements OnInit {
  warehouseData: FoodEntry[] = [];

  constructor(
    private warehouseService: WarehouseService,
    private loadingController: LoadingController
  ) {
    this.warehouseService.listenWarehouseChannel().subscribe((data) => {
      this.getWarehouseData();
    });
  }

  ngOnInit() {
    this.getWarehouseData();
  }

  async handleRefresh(event: any): Promise<void> {
    await this.getWarehouseData();
    event.target.complete();
  }

  async getWarehouseData(): Promise<FoodEntry[]> {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.warehouseService.getWarehouseData().then(async (data) => {
      await loading.dismiss();
      if (data && data.length > 0) {
        this.warehouseData = data;
        this.warehouseData.sort((a, b) => {
          return (
            new Date(a.shelf_life).getTime() - new Date(b.shelf_life).getTime()
          );
        });
      } else {
        this.warehouseData = [];
      }
    });
    return this.warehouseData;
  }

  ngOnDestroy() {
    this.warehouseService.unsubscribeWarehouseChannel();
    this.warehouseService.unsubscribeCommentsChannel();
  }
}
