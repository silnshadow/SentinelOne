import { Component, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private authService = inject(AuthService);
  welcomeMessage!: string;

constructor(private router: Router){

  if(this.authService.isLoggedIn()){
    this.welcomeMessage = `Hi ${this.authService.getCurrentUser().username}`;
  }
}

displayError(): void {
  try {
    var test = this.authService.signUp().subscribe();

  } catch (error) {
    // Handle the error or pass it to an error handling service
    console.error('Error occurred:', error);
  }
}

showWeatherBoard(): void{
  this.router.navigate(['/weather-board']);
}

showTalentTourneyDashboard(): void{
  this.router.navigate(['/app-music']);
}
}
