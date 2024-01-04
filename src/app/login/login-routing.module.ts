import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; 
import { SignupComponent } from './signup/signup.component'; 
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'resetPassword/:userName', component: ResetPasswordComponent },
];

@NgModule({
  imports: [
    [RouterModule.forChild(routes)],
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
