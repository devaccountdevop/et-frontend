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


@NgModule({
  declarations: [HomepageComponent, SideBarComponent, 
    TestComponent, 
    DashboardBodyComponent,
  TileComponent, DashboadComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    IonicModule,
    FormsModule,
    NgxPaginationModule
  ]
  
})
export class HomepageModule { }
