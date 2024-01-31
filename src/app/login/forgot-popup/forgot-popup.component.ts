import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AlertController } from '@ionic/angular';
import { CommanLoaderService } from 'src/app/services/comman-loader.service';
import { AddClientService } from 'src/app/services/homepageServices/add-client.service';
import { LoginService } from 'src/app/services/login.service';
import { TaskService } from 'src/app/services/task.service';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-forgot-popup',
  templateUrl: './forgot-popup.component.html',
  styleUrls: ['./forgot-popup.component.scss'],
})
export class ForgotPopupComponent implements OnInit {

  errorMessages: string[] = [];
  showInvalidError: boolean = false;
  showError: boolean = false;

  constructor(private alertController: AlertController,
    private dialog: MatDialog,
    private addClientService: AddClientService,
    private commonService: CommanLoaderService,
    private taskService: TaskService,
    private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

  resetPassword(email: string) {
    if (!this.isValidEmail(email)) {
      return
    }
    const formData = new FormData();
    formData.append("email", email);

    this.loginService.forgotPassword(formData).subscribe((res: any) => {
      console.log(res);
      if (res.code === 200) {
        this.close();
        this.openConfirmationPopUp(email)
      }
      else {
        this.showInvalidError = true;
        setTimeout(() => {
          this.showInvalidError = false;
        }, 5000);
      }
    }, (error: any) => {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 5000);
    })

  }
  isValidEmail(email: string): boolean {
    this.errorMessages = [];

    if (!email) {
      this.errorMessages.push('Email is required.');
    } else {
      const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
      if (!emailPattern.test(email)) {
        this.errorMessages.push('Please enter a valid email address.');
      }
    }

    return this.errorMessages.length === 0;
  }

  openConfirmationPopUp(email: any) {
    this.dialog.open(ConfirmationPopupComponent, {
      width: "400px",
      height: "200px",
      data: { email },
    });
  }
  close() {
    this.dialog.closeAll();
  }
}
