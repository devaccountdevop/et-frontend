import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomepageRoutingModule } from "./homepage-routing.module";
import { HomepageComponent } from "./homepage/homepage.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SideBarComponent } from "./homepage/side-bar/side-bar.component";
import { NgxPaginationModule } from "ngx-pagination";
import { FilterPipe } from "../pipes/filter.pipe";
import { AddClientModelComponent } from "./add-client-model/add-client-model.component";
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
} from "@angular/material/dialog";
import { ClientDeleteComponent } from "./add-client-model/client-delete/client-delete.component";
import { ClientUpdateComponent } from "./add-client-model/client-update/client-update.component";
import { SprintDashboardComponent } from "./sprint-dashboard/sprint-dashboard.component";
import { TaskListComponent } from "./task/task-list/task-list.component";
import { TableFilterPipe } from "../pipes/table-filter.pipe";
import { TaskModalComponent } from "./task/task-list/task-modal/task-modal.component";
import { TableShortPipe } from "../pipes/table-short.pipe";
import { ImportModalComponent } from "./import-modal/import-modal.component";
import * as XLSX from 'xlsx';
import { DateFormatPipe } from "../pipes/date-format.pipe";
import { HeaderComponent } from "./header/header.component";
import {MatIconModule} from '@angular/material/icon'
import { TaskGraphComponent } from "./task/task-graph/task-graph.component";
import { NgChartsModule } from 'ng2-charts';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MainComponent } from "./main/main.component";
import { ProjectGraphComponent } from "./homepage/project-graph/project-graph.component";

@NgModule({
  declarations: [
    HomepageComponent,
    SideBarComponent,
    AddClientModelComponent,
    TableFilterPipe,
    TaskModalComponent,
    ClientDeleteComponent,
    ClientUpdateComponent,
    SprintDashboardComponent,
    TaskListComponent,
    FilterPipe,
    TableShortPipe,
    ImportModalComponent,
    DateFormatPipe,
    HeaderComponent,
    TaskGraphComponent,
    MainComponent,
    ProjectGraphComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    IonicModule,
    FormsModule,
    NgxPaginationModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule,
    NgChartsModule,
    MatSidenavModule
    
  ],
  exports:[
    HomepageComponent,
    SideBarComponent,
    AddClientModelComponent,
    TableFilterPipe,
    TaskModalComponent,
    ClientDeleteComponent,
    ClientUpdateComponent,
    SprintDashboardComponent,
    TaskListComponent,
    FilterPipe,
    TableShortPipe,
    ImportModalComponent,
    DateFormatPipe,
    HeaderComponent,
    TaskGraphComponent,
    MainComponent
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
  ],
})
export class HomepageModule {}
