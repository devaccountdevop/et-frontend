import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './login/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'estimation-tool/homepage',
    loadChildren: () => import('./homepage/homepage.module').then( m => m.HomepageModule)
  },
  {
    path: 'homepage',
    redirectTo: '',
    pathMatch: 'full'
  },
  //{ path: '', component: LoginComponent },
  //{ path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
