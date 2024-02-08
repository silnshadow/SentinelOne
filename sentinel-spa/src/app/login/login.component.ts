import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = 'sentinelAdmin';
  password: string = 'happyAi-123';

  constructor(private authService: AuthService,
    private router: Router) {
  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        // Handle successful login response
        console.log('Login successful:', response);
        this.router.navigate(['/app-dashboard']);
      },
      error => {
        // Handle login error
        console.error('Login error:', error);
      }
    );
  }
}