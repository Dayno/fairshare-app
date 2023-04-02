import { Component, OnInit } from '@angular/core';
import { HistoryEntry } from 'src/app/models/history-entry.interface';
import { DialogService } from 'src/app/services/dialog.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-employee-dashboard-history',
  templateUrl: './employee-dashboard-history.page.html',
  styleUrls: ['./employee-dashboard-history.page.scss'],
})
export class EmployeeDashboardHistoryPage implements OnInit {
  historyData: HistoryEntry[] = [];

  constructor(
    private warehouseService: WarehouseService,
    private dialogService: DialogService,
  ) {
    this.warehouseService.listenCheckoutChannel().subscribe((data) => {
      this.getHistoryData();
    })
  }

  ngOnInit() {
    this.getHistoryData();
  }

  async handleRefresh(event: any): Promise<void> {
    await this.getHistoryData();
    event.target.complete();
  }

  async getHistoryData(): Promise<HistoryEntry[]> {
    await this.warehouseService.getCechkoutData()
      .then((data) => {
        if (data && data.length > 0) {
          this.historyData = data;
          this.historyData.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          });
        } else {
          this.historyData = [];
        }
      });
    return this.historyData;
  }

  ngOnDestroy() {
    this.warehouseService.unsubscribeCheckoutChannel();
  }
}
