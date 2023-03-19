import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { DialogService } from './dialog.service';

export interface FormItem {
  id: string;
  title: string;
  icon_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private supabase: SupabaseClient;

  constructor(private dialogService: DialogService) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // get data --
  async getCategorys(): Promise<any> {
    return await this.supabase
      .from('categorys')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          this.dialogService.presentToast(error.message);
        }
        return data
      });
  }

  async getOrigins(): Promise<any> {
    return await this.supabase
      .from('origin_categorys')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          this.dialogService.presentToast(error.message);
        }
        return data
      });
  }

  async getCategorysById(id: number): Promise<any> {
    return await this.supabase
      .from('categorys')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          this.dialogService.presentToast(error.message);
        }
        return data
      })
  }

  async getOriginsById(id: number): Promise<any> {
    return await this.supabase
      .from('origin_categorys')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          this.dialogService.presentToast(error.message);
        }
        return data
      })
  }
}
