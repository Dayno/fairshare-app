import { Component, Input, OnInit } from '@angular/core';
import { Status } from 'src/app/models/status.interface';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  @Input() status_id!: number;
  status!: string;

  constructor() { }

  ngOnInit() {
    if (this.status_id === 1) {
      this.status = Status.FAIRTEILT
    } else {
      this.status = Status.ENTSORGT
    }
  }
}
