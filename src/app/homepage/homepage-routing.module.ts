import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

import { SideBarComponent } from './homepage/side-bar/side-bar.component';

import { AddClientModelComponent } from './add-client-model/add-client-model.component';
import { SprintDashboardComponent } from './sprint-dashboard/sprint-dashboard.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'homepage', pathMatch: 'full' },
      { path: 'homepage', component: HomepageComponent },
      { path: 'sidebar', component: SideBarComponent },
      { path: 'addclient', component: AddClientModelComponent },
      { path: 'sprintdashboard', component: SprintDashboardComponent },
      { path: 'tasklist', component: TaskListComponent },
      { path: 'dashboard', component: DashboardComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
