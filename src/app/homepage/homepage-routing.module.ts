import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

import { SideBarComponent } from './homepage/side-bar/side-bar.component';

import { AddClientModelComponent } from './add-client-model/add-client-model.component';
import { SprintDashboardComponent } from './sprint-dashboard/sprint-dashboard.component';
import { TaskListComponent } from './task/task-list/task-list.component';

const routes: Routes = [

  { path: '', component: HomepageComponent },
  { path: 'sidebar', component: SideBarComponent },
  { path: 'addclient', component: AddClientModelComponent },
  { path: 'sprintdashboard', component: SprintDashboardComponent},
  { path: 'tasklist', component: TaskListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
