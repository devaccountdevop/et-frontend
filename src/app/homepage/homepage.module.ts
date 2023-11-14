import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomepageRoutingModule } from "./homepage-routing.module";
import { HomepageComponent } from "./homepage/homepage.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { SideBarComponent } from "./homepage/side-bar/side-bar.component";

import { DashboardBodyComponent } from "./dashboard-body/dashboard-body.component";
import { TileComponent } from "./homepage/tile/tile.component";
import { NgxPaginationModule } from "ngx-pagination";
import { EtCommonModule } from "../et-common/et-common.module";
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

@NgModule({
  declarations: [
    HomepageComponent,
    SideBarComponent,
    AddClientModelComponent,
    TableFilterPipe,
    TaskModalComponent,
    DashboardBodyComponent,
    ClientDeleteComponent,
    ClientUpdateComponent,
    TileComponent,
    SprintDashboardComponent,
    TaskListComponent,
    FilterPipe,
    TableShortPipe,
    ImportModalComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    IonicModule,
    FormsModule,
    NgxPaginationModule,
    MatDialogModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
  ],
})
export class HomepageModule {}
