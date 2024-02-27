import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { protectGuard } from './interceptor/auth.guard';

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
    path: 'estimation-tool',
    canMatch:[protectGuard],
    loadChildren: () => import('./homepage/homepage.module').then( m => m.HomepageModule)
  },
  {
    path: 'homepage',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: '**',redirectTo: '',pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
