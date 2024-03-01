import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherForecast } from './model/weather.forecast.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service'; // Import your AuthService

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  private weatherApiUrl = 'https://localhost:7253/api/WeatherForecast';

  constructor(
    private http: HttpClient,
    private authService: AuthService // Inject your AuthService
  ) {}

  getAllWeather(): Observable<WeatherForecast[]> {
    // Get the authentication token from your AuthService
    const authToken = this.authService.getAuthToken();

    // Set the token in the request headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${authToken}`
    });

    // Make the HTTP request with the headers
    return this.http.get<WeatherForecast[]>(this.weatherApiUrl, { headers });
  }
}