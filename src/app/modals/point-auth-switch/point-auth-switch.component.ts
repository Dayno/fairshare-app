import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-point-auth-switch',
  templateUrl: './point-auth-switch.component.html',
  styleUrls: ['./point-auth-switch.component.scss'],
})
export class PointAuthSwitchComponent implements OnInit {
  formData = this.fb.nonNullable.group({
    pointId: ["", Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private router: Router,
    private dialogService: DialogService,
    private authService: AuthService,
  ) { }

  ngOnInit() { }

  get pointId() {
    return this.formData.get('pointId');
  }

  close(): void {
    this.modalController.dismiss();
  }

  async pointSwitch(): Promise<void> {
    const pointId = localStorage.getItem('pointId');
    if (this.formData.getRawValue().pointId === pointId) {
      await this.authService.empSignIn(this.formData.getRawValue().pointId);
      this.router.navigateByUrl('/point/dashboard');
    } else {
      this.dialogService.showAlert('Login fehlgeschlagen', 'Die Point ID ist falsch. Bitte überprüfe deine Eingabe');
    }
    this.modalController.dismiss();
  }
}
