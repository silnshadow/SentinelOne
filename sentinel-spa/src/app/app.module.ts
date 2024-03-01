import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Component} from '@angular/core';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ErrorInterceptor } from './core/error.Interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatListModule} from '@angular/material/list';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent, DashboardComponent, LoginComponent,
    WeatherForecastComponent],
  imports: [HttpClientModule, BrowserModule, FormsModule, AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatListModule,
    MatInputModule,
    ReactiveFormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ], 
  bootstrap: [AppComponent],
})
export class AppModule {}
