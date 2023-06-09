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
    this.authService.isCurrentPointOwner().then((isOwner) => {
      if (!isOwner) {
        return;
      }
      this.router.navigate(['/point/dashboard']);
    });
  }

  ngOnInit() {
  }

}
