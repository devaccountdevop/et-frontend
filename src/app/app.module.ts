import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HomepageModule } from './homepage/homepage.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { SpinnerComponent } from './spinner/spinner/spinner.component';
import { SpinnerInterceptor } from './interceptor/spinner.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [AppComponent,SpinnerComponent, DashboardComponent ],
  imports: [BrowserModule, 
    BrowserAnimationsModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    LoginModule,
    FormsModule,
    HttpClientModule,
    HomepageModule,
    NgxPaginationModule,
    MatDialogModule,
    ReactiveFormsModule
  
  ],
  providers: [ {provide:HTTP_INTERCEPTORS,useClass:SpinnerInterceptor,multi:true}
    ,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
     {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent],
})
export class AppModule {}
