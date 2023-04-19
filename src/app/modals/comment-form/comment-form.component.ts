import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { WarehouseService } from 'src/app/services/warehouse.service';

export interface Comment {
  id: number
  item_id: number,
  message: string,
  created_at: Date
}

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() itemId!: string;
  @Input() comments!: Comment[];

  commentForm = this.fb.nonNullable.group({
    comment: ['', Validators.required]
  });

  get title() {
    return this.commentForm.get('title');
  }

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private warehouseService: WarehouseService
  ) { }

  ngOnInit() {
    this.warehouseService.listenCommentsChannel().subscribe((data) => {
      if (data.eventType === 'DELETE') {
        this.comments = this.comments.filter(item => item.id !== data.old.id)
        return;
      }
      this.comments.push(data.new);
    })
  }

  close(): void {
    this.modalController.dismiss(null);
  }

  onSubmit(): void {
    this.warehouseService.addComment(this.itemId, this.commentForm.getRawValue().comment);
    this.commentForm.reset();
  }
}
