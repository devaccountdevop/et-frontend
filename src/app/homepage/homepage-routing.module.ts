import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

import { SideBarComponent } from './homepage/side-bar/side-bar.component';

import { AddClientModelComponent } from './add-client-model/add-client-model.component';
import { SprintDashboardComponent } from './sprint-dashboard/sprint-dashboard.component';

const routes: Routes = [

  { path: '', component: HomepageComponent },
  { path: 'sidebar', component: SideBarComponent },
  { path: 'addclient', component: AddClientModelComponent },
  { path: 'sprintdashboard', component: SprintDashboardComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
