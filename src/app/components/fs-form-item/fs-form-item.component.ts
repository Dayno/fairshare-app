import { Component, Input, OnInit } from '@angular/core';
import { FormItem } from 'src/app/services/data.service';

@Component({
  selector: 'app-fs-form-item',
  templateUrl: './fs-form-item.component.html',
  styleUrls: ['./fs-form-item.component.scss'],
})
export class FsFormItemComponent implements OnInit {
  @Input() item!: FormItem;

  constructor() { }

  ngOnInit() { }

}
