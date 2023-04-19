import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-foodsaver-auth',
  templateUrl: './foodsaver-auth.page.html',
  styleUrls: ['./foodsaver-auth.page.scss'],
})
export class FoodsaverAuthPage implements OnInit {

  constructor(private authService: AuthService) {
    this.authService.empSignOut();
  }

  ngOnInit() {
  }

}
