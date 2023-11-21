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
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';

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
    MatDialogModule
   
  
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent],
})
export class AppModule {}
