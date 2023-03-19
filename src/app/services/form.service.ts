import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FoodEntry } from '../models/food-entry.interface';
import { ShelfLifeDates } from '../models/shelf-life';
import { AuthService } from './auth.service';

interface Checkin {
  title: string,
  cool: boolean,
  origin: string,
  shelf_life: Date,
  allergens: string,
  comment: string,
  category_id: number,
  origin_category_id: number,
  // checkin
  foodsaver_id: string,
  food_id: string,
  point_id: string,
  quantity: number
}


@Injectable({
  providedIn: 'root'
})
export class FormService {
  private supabase: SupabaseClient;
  private deliveries = new BehaviorSubject<FoodEntry[]>([]);

  constructor(private authService: AuthService, private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )
    const storedDeliveries = localStorage.getItem('deliveries');
    if (storedDeliveries) {
      this.deliveries.next(JSON.parse(storedDeliveries));
    }
  }

  // submit Delivery

  async submitDelivery(): Promise<any> {
    const pointId = await this.authService.getCurrentPointId();
    const foodsaverId = this.authService.getCurrentUserId();
    // map over the array of deliveries and return a new array of promises
    const checkinPromises = this.deliveries.getValue().map(item => {
      let param = {
        "title": item.title,
        "cool": item.cool,
        "origin": item.origin,
        "shelf_life": ShelfLifeDates.getShelfLifeDates()[item.shelf_life],
        "allergens": item.allergens,
        "comment": item.comment,
        "category_id": item.category_id,
        "origin_category_id": item.origin_category_id,
        "foodsaver_id": foodsaverId,
        "food_id": item.id,
        "point_id": pointId,
        "quantity": item.quantity
      };
      return this.checkinData(param);
    });

    // Wait for all of the promises to resolve, and then return an array of results.
    return Promise.all(checkinPromises);
  }

  async checkinData(param: Checkin): Promise<any> {
    const { data, error } = await this.supabase.rpc('checkin', {
      // foods
      title: param.title,
      cool: param.cool,
      origin: param.origin,
      shelflife: param.shelf_life,
      allergens: param.allergens,
      comment: param.comment,
      categoryid: param.category_id,
      origincategoryid: param.origin_category_id,
      // checkin
      foodsaverid: param.foodsaver_id,
      foodid: param.food_id,
      pointid: param.point_id,
      quantity: param.quantity,
    });
    if (error) {
      return error
    } else {
      this.clearDeliveries();
      return data
    }
  }

  // FORM Dashboard CRUD
  getCurrentDeliveries(): BehaviorSubject<FoodEntry[]> {
    return this.deliveries;
  }

  addDeliveryItem(item: FoodEntry): void {
    this.deliveries.next([...this.deliveries.getValue(), item]);
    localStorage.setItem('deliveries', JSON.stringify(this.deliveries.getValue()));
  }

  editDeliveryItem(item: FoodEntry): void {
    this.router.navigate(['point/foodsaver/dashboard/form'], { queryParams: { item: JSON.stringify(item) } });
  }

  updateDeliveryItem(item: FoodEntry): void {
    const deliveries = this.deliveries.getValue().map(deliveryItem => {
      if (deliveryItem.id === item.id) {
        return item;
      }
      return deliveryItem;
    });
    this.deliveries.next(deliveries);
    // Update localStorage with the new deliveries array
    localStorage.setItem('deliveries', JSON.stringify(deliveries));
  }

  deleteDeliveryItem(item: FoodEntry): void {
    const deliveries = this.deliveries.getValue().filter(deliveryItem => deliveryItem !== item);
    this.deliveries.next(deliveries);
    // Update localStorage with the new deliveries array
    localStorage.setItem('deliveries', JSON.stringify(deliveries));
  }

  clearDeliveries(): void {
    this.deliveries.next([]);
    localStorage.removeItem('deliveries');
  }
}
