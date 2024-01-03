import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { AppComponent } from '../app.component';
import { LoginRoutingModule } from './login-routing.module';
import { ForgotPopupComponent } from './forgot-popup/forgot-popup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
} from "@angular/material/dialog";
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';


@NgModule({
  declarations: [LoginComponent, SignupComponent,ForgotPopupComponent,ResetPasswordComponent,ConfirmationPopupComponent],
  imports: [
    CommonModule,
    //BrowserModule,
    IonicModule,
    FormsModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MatDialogModule
    
    
  ],
  providers:[
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  bootstrap: [AppComponent],
})
export class LoginModule { }
