import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { TestComponent } from './test/test.component';
import { SideBarComponent } from './homepage/side-bar/side-bar.component';

import { DashboadComponent } from './homepage/side-bar/dashboad/dashboad.component';

const routes: Routes = [

  { path: '', component: HomepageComponent },
  { path: 'test', component: TestComponent },
  { path: 'sidebar', component: SideBarComponent },
  { path: 'dashboard', component: DashboadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
