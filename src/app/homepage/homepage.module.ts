import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SideBarComponent } from './homepage/side-bar/side-bar.component';
import { TestComponent } from './test/test.component';
import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';
import { TileComponent } from './homepage/tile/tile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboadComponent } from './homepage/side-bar/dashboad/dashboad.component';
import { EtCommonModule } from '../et-common/et-common.module';
import { FilterPipe } from '../pipes/filter.pipe';
import { AddClientModelComponent } from './add-client-model/add-client-model.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [HomepageComponent, SideBarComponent, 
    TestComponent, AddClientModelComponent,
    DashboardBodyComponent,
  TileComponent, DashboadComponent, FilterPipe],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    IonicModule,
    FormsModule,
    NgxPaginationModule,
    MatDialogModule
  
   
   
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ]
  
})
export class HomepageModule { }
