import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.page.html',
  styleUrls: ['./employee-dashboard.page.scss'],
})
export class EmployeeDashboardPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private warehouseService: WarehouseService) {
    this.authService.getCurrentPoint().subscribe((point) => {
      if (!point) {
        this.router.navigateByUrl('/point');
      }
    });
    this.authService.getCurrentEmp().subscribe((emp) => {
      if (!emp) {
        this.router.navigateByUrl('point/foodsaver');
      }
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.warehouseService.unsubscribeWarehouseChannel();
  }
}
