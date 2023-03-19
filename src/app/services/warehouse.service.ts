import { Injectable } from '@angular/core';
import { createClient, RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WarehouseDataConverter } from '../converters/warehouseData.converter';
import { FoodEntry } from '../models/food-entry.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private supabase: SupabaseClient;
  private realtimeChannel: RealtimeChannel = true as any;

  constructor(
    private authService: AuthService,
    private convert: WarehouseDataConverter
  ) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )
  }

  // realtime Channel ----
  listenRealtimeChannel(): Observable<any> {
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

  unsubscribeRealtimeChannel(): void {
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
}
