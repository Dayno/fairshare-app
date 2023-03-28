import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodEntry } from 'src/app/models/food-entry.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-employee-dashboard-main',
  templateUrl: './employee-dashboard-main.page.html',
  styleUrls: ['./employee-dashboard-main.page.scss'],
})
export class EmployeeDashboardMainPage implements OnInit {
  warehouseData!: FoodEntry[];

  constructor(
    private warehouseService: WarehouseService,
    private dialogService: DialogService,
  ) {
    this.warehouseService.listenRealtimeChannel().subscribe((data) => {
      this.getWarehouseData();
    })
  }

  ngOnInit() {
    this.getWarehouseData();
  }

  async handleRefresh(event: any): Promise<void> {
    await this.getWarehouseData();
    event.target.complete();
  }

  async getWarehouseData(): Promise<FoodEntry[]> {
    await this.warehouseService.getWarehouseData()
      .then((data) => {
        if (data && data.length > 0) {
          this.warehouseData = data;
          this.warehouseData.sort((a, b) => {
            return new Date(a.shelf_life).getTime() - new Date(b.shelf_life).getTime();
          });
        } else {
          this.warehouseData = [];
          this.dialogService.presentToast('Keine Daten gefunden');
        }
      });
    return this.warehouseData;
  }

  ngOnDestroy() {
    this.warehouseService.unsubscribeRealtimeChannel();
  }
}
