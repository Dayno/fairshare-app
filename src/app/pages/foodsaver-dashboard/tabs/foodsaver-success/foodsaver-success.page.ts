import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-foodsaver-success',
  templateUrl: './foodsaver-success.page.html',
  styleUrls: ['./foodsaver-success.page.scss'],
})
export class FoodsaverSuccessPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  async finish(): Promise<void> {
    await this.authService.signOutUser();
    this.router.navigate(['/point/foodsaver']);
  }

}
