import { Component, Input, OnInit } from '@angular/core';

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
      this.status = "Fairteilt"
    } else {
      this.status = "Entsorgt"
    }
  }
}
