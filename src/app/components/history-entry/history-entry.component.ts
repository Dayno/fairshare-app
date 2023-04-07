import { Component, Input, OnInit } from '@angular/core';
import { HistoryEntry } from 'src/app/models/history-entry.interface';
import { DataService, FormItem } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-history-entry',
  templateUrl: './history-entry.component.html',
  styleUrls: ['./history-entry.component.scss'],
})
export class HistoryEntryComponent implements OnInit {
  @Input() item!: HistoryEntry;

  category!: FormItem;
  origin!: FormItem;

  constructor(
    private dialogService: DialogService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.checkData();
    console.log(this.item);
  }

  async checkData(): Promise<void> {
    // get catregory and origin
    this.category = await this.dataService.getCategorysById(
      this.item.category_id
    );
    this.origin = await this.dataService.getOriginsById(
      this.item.origin_category_id
    );
  }

  // modal functionality --
  async openFoodEntryInfo(): Promise<void> {
    this.dialogService.presentFoodEntryInfoModal(
      this.item,
      this.category,
      this.origin
    );
  }
}
