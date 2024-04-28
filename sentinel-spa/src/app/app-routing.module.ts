import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { MusicComponent } from './user-work/music/music.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login page by default
  { path: 'login', component: LoginComponent },
  { path: 'app-dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'weather-board', component: WeatherForecastComponent, canActivate: [AuthGuard]},
  { path: 'app-music', component: MusicComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }