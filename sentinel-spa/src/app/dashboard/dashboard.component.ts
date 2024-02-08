import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  welcomeMessage!: string;

constructor(authService: AuthService){

  var test = authService.signUp().subscribe();
  if(authService.isLoggedIn()){
    this.welcomeMessage = `Hi ${authService.getCurrentUser().username}`;
  }
}

displayError(): void {
  try {
    throw new Error('This is a test error.');
  } catch (error) {
    // Handle the error or pass it to an error handling service
    console.error('Error occurred:', error);
  }
}
}
