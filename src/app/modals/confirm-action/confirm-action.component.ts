import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrls: ['./confirm-action.component.scss'],
})
export class ConfirmActionComponent implements OnInit {
  @Input() message!: string;
  @Input() amount!: number;

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  confirm(): void {
    this.modalController.dismiss({ confirm: true });
  }

  cancel(): void {
    this.modalController.dismiss({ confirm: false });
  }
}
