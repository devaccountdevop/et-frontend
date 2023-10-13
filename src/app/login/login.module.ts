import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { AppComponent } from '../app.component';
import { LoginRoutingModule } from './login-routing.module';



@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    //BrowserModule,
    IonicModule,
    FormsModule,
    LoginRoutingModule,
    
    
  ],
  bootstrap: [AppComponent],
})
export class LoginModule { }
