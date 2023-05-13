import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RangeCustomEvent, RangeValue } from '@ionic/core';
import { FormItem, DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';
import { FormService } from 'src/app/services/form.service';
import { v4 as uuidv4 } from 'uuid';
import { ShelfLifeString } from 'src/app/models/shelf-life';

@Component({
  selector: 'app-foodsaver-form',
  templateUrl: './foodsaver-form.page.html',
  styleUrls: ['./foodsaver-form.page.scss'],
})
export class FoodsaverFormPage implements OnInit {
  categorys: FormItem[] = [];
  origins: FormItem[] = [];
  edit: boolean = false;

  emittedRangeValue: RangeValue | undefined;

  // input range steps --
  steps = Object.values(ShelfLifeString);

  // form fields -------
  formData = this.fb.nonNullable.group({
    id: [uuidv4()],
    title: ['', Validators.required],
    quantity: [
      0,
      [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
        Validators.min(0.1),
      ],
    ],
    category_id: [-1, [Validators.required, Validators.min(0)]],
    shelf_life: [-1, [Validators.required, Validators.min(0)]],
    origin_category_id: [-1, [Validators.required, Validators.min(0)]],
    cool: [false],
    origin: [''],
    allergens: [''],
    comment: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService,
    private formService: FormService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    if (
      this.route.snapshot.queryParams?.['item'] &&
      this.route.snapshot.queryParams?.['item']['length'] > 0
    ) {
      this.edit = true;
      this.setFormValues();
    }
    // get data
    this.getCategpoys();
    this.getOrigins();
    // range logic
    const input = <HTMLInputElement>document.getElementById('input');
    input.addEventListener('input', () => {
      this.updateStepColors();
    });
    this.updateStepColors();
  }

  // getter ----

  get title() {
    return this.formData.get('title');
  }

  get cool() {
    return this.formData.get('cool');
  }

  get quantity() {
    return this.formData.get('quantity');
  }

  get category() {
    return this.formData.get('category_id');
  }

  get shelf_life() {
    return this.formData.get('shelf_life');
  }

  get origin_category() {
    return this.formData.get('origin_category_id');
  }

  get origin() {
    return this.formData.get('origin');
  }

  get allergens() {
    return this.formData.get('allergens');
  }

  get comment() {
    return this.formData.get('comment');
  }

  // get data
  getCategpoys(): void {
    this.dataService.getCategorys().then((data) => {
      this.categorys = data;
    });
  }
  getOrigins(): void {
    this.dataService.getOrigins().then((data) => {
      this.origins = data;
    });
  }

  // handle form data ----

  private setFormValues(): void {
    this.route.queryParams.subscribe((params) => {
      const item = JSON.parse(params['item']);
      this.formData.patchValue({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        category_id: item.category_id,
        shelf_life: item.shelf_life,
        origin_category_id: item.origin_category_id,
        cool: item.cool,
        origin: item.origin,
        allergens: item.allergens,
        comment: item.comment,
      });
    });
  }

  onSubmit(): void {
    if (
      this.formData.valid &&
      this.formData.getRawValue().title?.length > 0 &&
      this.formData.getRawValue().quantity > 0 &&
      this.formData.getRawValue().category_id >= 0 &&
      this.formData.getRawValue().shelf_life >= 0
    ) {
      this.formService.addDeliveryItem(this.formData.getRawValue());
      this.router.navigate(['point/foodsaver/dashboard']);
      this.formData.reset();
    } else {
      this.dialogService.showAlert(
        'Fehler',
        'Bitte fülle alle notwendigen Felder aus: Lebensmittelname, Menge, Kategorie, Haltbarkeit'
      );
    }
  }

  update(): void {
    this.formService.updateDeliveryItem(this.formData.getRawValue());
    this.router.navigate(['point/foodsaver/dashboard']);
  }

  async cancelSubmission(): Promise<void> {
    const result = await this.dialogService.confirm(
      'Bist du sicher, dass du zurück zur Übersicht möchtest?'
    );
    if (result) {
      this.router.navigate(['point/foodsaver/dashboard']);
    }
  }

  // input range functionality --
  stepColor(id: number): string {
    if (
      id == parseInt((<HTMLInputElement>document.getElementById('input')).value)
    ) {
      return '#99BB44';
    } else {
      return '#BEBEB9';
    }
  }

  private updateStepColors(): void {
    for (let i = 1; i <= 8; i++) {
      const div = document.getElementById(i.toString());
      if (div) {
        div.style.color = this.stepColor(i);
      }
    }
  }

  onRangeChange(event: Event): void {
    this.emittedRangeValue = (event as RangeCustomEvent).detail.value;
  }
}
