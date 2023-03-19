import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.authService.getCurrentEmp().pipe(
      filter((val) => val !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete!
      map((empId) => {
        if (empId) {
          return true;
        } else {
          this.toastController
            .create({
              message: 'Du hast keinen Zugriff auf diese Seite!',
              duration: 2000,
            })
            .then((toast) => toast.present());

          return this.router.createUrlTree(['/point/foodsaver/auth']);
        }
      })
    );
  }
}
