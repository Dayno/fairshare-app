import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-foodsaver-auth',
  templateUrl: './foodsaver-auth.page.html',
  styleUrls: ['./foodsaver-auth.page.scss'],
})
export class FoodsaverAuthPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    this.authService.empSignOut();
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.router.navigateByUrl('point/foodsaver/dashboard');
      }
    });
  }

  ngOnInit() {
  }

}
