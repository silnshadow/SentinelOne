import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicBrainzService {
  //private apiUrl = 'https://musicbrainz.org/ws/2/';
  private loginUrl = 'https://localhost:7008/api/Authentication/login';

  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(this.loginUrl, body);
  }
}
