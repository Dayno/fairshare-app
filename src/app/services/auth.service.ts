import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Foodsaver } from '../models/foodsaver.interface';
import { GenericObject } from '../models/generic-object';
import { Point } from '../models/point.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentPoint: BehaviorSubject<any> = new BehaviorSubject(null);
  private currentEmp: BehaviorSubject<any> = new BehaviorSubject(null);
  private currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    this.supabase.auth.onAuthStateChange((event, session: any) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.currentUser.next(session.user);
      } else {
        this.currentUser.next(false);
      }
    });
    this.loadEmp();
    this.loadPoint();
    this.loadUser();
  }

  // LOAD Auth

  private loadPoint(): void {
    if (this.currentPoint.value) {
      return;
    }
    const pointId = localStorage.getItem('pointId');
    if (pointId) {
      this.currentPoint.next(pointId);
    } else {
      this.currentPoint.next(false);
    }
  }
  private loadEmp(): void {
    if (this.currentEmp.value) {
      return;
    }
    const empId = localStorage.getItem('empId');
    if (empId) {
      this.currentEmp.next(empId);
    } else {
      this.currentEmp.next(false);
    }
  }
  private async loadUser(): Promise<void> {
    if (this.currentUser.value) {
      return;
    }
    const user = await this.supabase.auth.getUser();
    if (user.data.user) {
      this.currentUser.next(user.data.user);
    } else {
      this.currentUser.next(false);
    }
  }

  // EMPLOYEE AUTH 

  public getCurrentEmp(): Observable<Point> {
    return this.currentEmp.asObservable();
  }

  public async empSignIn(empId: string): Promise<boolean> {
    const result = await this.supabase.from('points').select().eq('point_id', empId)
    if (result.data && result.data.length > 0) {
      this.currentEmp.next(empId);
      localStorage.setItem('empId', empId);
      return true
    } else {
      return false
    }
  }

  empSignOut(): void {
    localStorage.removeItem('empId');
    this.currentEmp.next(false);
  }

  // ----- POINT AUTH -----

  public getCurrentPoint(): Observable<Point> {
    return this.currentPoint.asObservable();
  }

  public async getCurrentPointId(): Promise<string> {
    const result = await this.supabase.from('points').select('id').eq('point_id', this.currentPoint.value).single();
    if (result.data) {
      return result.data.id;
    } else {
      return '';
    }
  }

  public async pointSignIn(pointId: string): Promise<boolean> {
    const result = await this.supabase.from('points').select().eq('point_id', pointId)
    if (result.data && result.data.length > 0) {
      this.currentPoint.next(pointId);
      localStorage.setItem('pointId', pointId);
      return true
    } else {
      return false
    }
  }

  pointSignOut(): void {
    localStorage.removeItem('pointId');
    this.currentPoint.next(false);
  }

  // ----- FOODSAVER AUTH ----- 

  public getCurrentUser(): Observable<User | any> {
    return this.currentUser.asObservable();
  }

  public getCurrentUserId(): string {
    if (this.currentUser.value) {
      return (this.currentUser.value as User).id;
    } else {
      return '';
    }
  }

  public async getUserData(): Promise<GenericObject> {
    return await this.supabase.from('foodsaver').select().eq('id', this.getCurrentUserId()).single();
  }

  public async getUserEmail(tel: number): Promise<Foodsaver["email"]> {
    return await this.supabase.from('foodsaver').select().eq('tel', tel).single()
      .then((result) => {
        if (result.data) {
          return result.data['email'];
        } else {
          return false;
        }
      });
  }

  // Foodsaver SIGN IN / SIGN OUT
  public async signInUser(credentials: { email: string; password: string }): Promise<GenericObject> {
    return await this.supabase.auth.signInWithPassword(credentials);
  }
  public async signOutUser(): Promise<GenericObject> {
    return await this.supabase.auth.signOut();
  }

  // Foodsaver REGISTER
  public async registerUser(credentials: Foodsaver): Promise<GenericObject> {
    return await this.supabase.auth.signUp(credentials)
      .then(async (result) => {
        if (result.data.user) {
          await this.supabase.from('foodsaver').update({
            first_name: credentials.first_name,
            last_name: credentials.last_name,
            tel: credentials.tel,
            foodsharing_id: credentials.foodsharing_id
          }).eq('id', result.data.user.id)
          return result
        } else {
          return result
        }
      });
  }
}
