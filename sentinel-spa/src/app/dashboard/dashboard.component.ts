import { Component, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private authService = inject(AuthService);
  welcomeMessage!: string;

constructor(){

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
}
