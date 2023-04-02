import { Injectable } from '@angular/core';
import { createClient, RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WarehouseDataConverter } from '../converters/warehouseData.converter';
import { FoodEntry } from '../models/food-entry.interface';
import { AuthService } from './auth.service';
import { DialogService } from './dialog.service';
import { HistoryEntry } from '../models/history-entry.interface';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private supabase: SupabaseClient;
  private realtimeChannel: RealtimeChannel = true as any;

  constructor(
    private authService: AuthService,
    private convert: WarehouseDataConverter,
    private dialogService: DialogService
  ) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )
  }

  // realtime Channel ----
  listenWarehouseChannel(): Observable<any> {
    const changes = new Subject();
    this.realtimeChannel = this.supabase.channel("public:warehouse").on("postgres_changes",
      {
        event: '*',
        schema: 'public',
        table: 'warehouse'
      }, async (payload) => {
        changes.next(payload)
      }).subscribe();
    return changes.asObservable();
  }

  unsubscribeWarehouseChannel(): void {
    if (this.realtimeChannel) {
      this.supabase.removeChannel(this.realtimeChannel);
    }
  }

  listenCommentsChannel(): Observable<any> {
    const changes = new Subject();
    this.realtimeChannel = this.supabase.channel("public:comments").on("postgres_changes",
      {
        event: '*',
        schema: 'public',
        table: 'comments'
      }, async (payload) => {
        changes.next(payload)
      }).subscribe();
    return changes.asObservable();
  }

  unsubscribeCommentsChannel(): void {
    if (this.realtimeChannel) {
      this.supabase.removeChannel(this.realtimeChannel);
    }
  }

  listenCheckoutChannel(): Observable<any> {
    const changes = new Subject();
    this.realtimeChannel = this.supabase.channel("public:checkout").on("postgres_changes",
      {
        event: '*',
        schema: 'public',
        table: 'checkout'
      }, async (payload) => {
        changes.next(payload)
      }).subscribe();
    return changes.asObservable();
  }

  unsubscribeCheckoutChannel(): void {
    if (this.realtimeChannel) {
      this.supabase.removeChannel(this.realtimeChannel);
    }
  }

  async getWarehouseData(): Promise<FoodEntry[]> {
    const pointId = await this.authService.getCurrentPointId();
    const result = await this.supabase.from('warehouse').select('*, food_id(*), checkin_id(id, foodsaver_id(*))').eq('point_id', pointId);
    const data = result.data?.map(obj => ({
      ...obj,
      ...obj['food_id'],
      id: obj['id'],
      point_id: pointId,
      checkin_id: obj['checkin_id'].id,
      food_id: obj['food_id'].id,
      first_name: obj['checkin_id'].foodsaver_id.first_name,
      last_name: obj['checkin_id'].foodsaver_id.last_name,
      email: obj['checkin_id'].foodsaver_id.email,
      tel: obj['checkin_id'].foodsaver_id.tel
    }));
    if (data !== undefined) {
      const foodEntrys = this.convert.fromRestArray(data);
      return foodEntrys;
    } else {
      return [];
    }
  }

  async getCechkoutData(): Promise<any> {
    const limit = 30;
    const result = await this.supabase
      .from('checkout')
      .select('*, food_id(*)')
      .order('created_at', { ascending: false })
      .limit(limit);
    const data = result.data?.map(obj => ({
      ...obj,
      ...obj['food_id'],
      food_id: obj['food_id'].id,
      id: obj['id'],
      created_at: obj['created_at']
    }));
    if (data !== undefined) {
      return data;
    } else {
      return [];
    }
  }

  async checkoutData(param: any, statusId: number, quantity: number): Promise<any> {
    const { data, error } = await this.supabase.rpc('checkout', {
      setquantity: quantity,
      warehouseid: param.id,
      checkinid: param.checkin_id,
      pointid: param.point_id,
      foodid: param.food_id,
      status_id: statusId,
    })
    if (error) {
      return error
    } else {
      return data
    }
  }

  async getComments(itemId: string): Promise<any> {
    return await this.supabase
      .from('comments')
      .select('*')
      .eq('item_id', itemId)
      .then(({ data, error }) => {
        if (error) {
          this.dialogService.presentToast(error.message);
        }
        return data
      });
  }

  async addComment(itemId: string, comment: string): Promise<any> {
    return await this.supabase
      .from('comments')
      .insert({ 'item_id': itemId, 'message': comment })
      .then(({ data, error }) => {
        if (error) {
          this.dialogService.presentToast(error.message);
        }
        return data
      });
  }
}
