import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from './login/model/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiUrl = 'https://musicbrainz.org/ws/2/';
  private loginUrl = 'https://localhost:7008/api/Authentication/login';
  private readonly USER_KEY = 'currentUser';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    const body = { username, password };
    const responseBody = this.http.post<LoginResponse>(this.loginUrl, body);

    responseBody.subscribe(
      (response: LoginResponse) => {
        console.log('Login successful:', response);
    
        // Handle successful login response
        const token = response.token;
        const user = { username: username, token: token };
        
        // Store user information in Local Storage
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      },
      error => {
        // Handle login error
        console.error('Login error:', error);
      }
    );

    return responseBody;
  }

  signUp(): Observable<any>{
    const body = { username:"d", password:"d" };
    return this.http.post<LoginResponse>(this.loginUrl, body);
  }

  logout(): void {
    // Remove user information from Local Storage
    localStorage.removeItem(this.USER_KEY);
  }

  getCurrentUser(): any {
    // Retrieve user information from Local Storage
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    // Check if user is logged in based on presence of user information in Local Storage
    return !!localStorage.getItem(this.USER_KEY);
  }
}
