import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

import { SideBarComponent } from './homepage/side-bar/side-bar.component';

import { DashboadComponent } from './homepage/side-bar/dashboad/dashboad.component';
import { AddClientModelComponent } from './add-client-model/add-client-model.component';

const routes: Routes = [

  { path: '', component: HomepageComponent },
  { path: 'sidebar', component: SideBarComponent },
  { path: 'dashboard', component: DashboadComponent },
  { path: 'addclient', component: AddClientModelComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
