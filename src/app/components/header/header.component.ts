import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() showLogoutOption!: boolean;
  @Input() showLoginOption!: boolean;

  constructor(
    private authService: AuthService,
    private dialogService: DialogService
  ) { }

  ngOnInit() { }

  pointSwitch(): void {
    this.dialogService.presentPointSwitchModal();
  }

  pointLogout(): void {
    this.dialogService.confirm('Möchtest du dich wirklich abmelden?')
      .then(async (result) => {
        if (result) {
          try {
            this.authService.signOutUser();
          } catch (error) {
            this.dialogService.showAlert('Fehler', 'Es ist ein Fehler aufgetreten.');
          }
        }
      });
  }
}
