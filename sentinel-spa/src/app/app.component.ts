import { Component } from '@angular/core';
import { MusicBrainzService } from './music-brainz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sentinel-spa';
  artist: any;
  apiStatus: any;
  username: string = '';
  password: string = '';

  constructor(private musicBrainzService: MusicBrainzService) {
  }

  onSubmit() {
    this.musicBrainzService.login(this.username, this.password).subscribe(
      response => {
        // Handle successful login response
        console.log('Login successful:', response);
      },
      error => {
        // Handle login error
        console.error('Login error:', error);
      }
    );
  }
}
