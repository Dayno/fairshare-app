import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fs-form-info',
  templateUrl: './fs-form-info.component.html',
  styleUrls: ['./fs-form-info.component.scss'],
})
export class FsFormInfoComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  confirm(): void {
    this.modalController.dismiss({ confirm: true });
  }
}
