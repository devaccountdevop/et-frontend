import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { FormsModule } from '@angular/forms';
import { HomepageModule } from './homepage/homepage.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { EtCommonModule } from './et-common/et-common.module';
import { sample } from 'rxjs';
//import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [AppComponent, ],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    LoginModule,
    FormsModule,
    HttpClientModule,
    HomepageModule,
    NgxPaginationModule,
    EtCommonModule,
   
  
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
