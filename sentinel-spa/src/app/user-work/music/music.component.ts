import { Component } from '@angular/core';

@Component({
  selector: 'app-music',
  standalone: false,
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent {

  thumbnailUrl: string = '';

  onFileSelected(event: any) {
    // Logic to handle file selection for music
  }

  onThumbnailSelected(event: any) {
    // Logic to handle file selection for thumbnail
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.thumbnailUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadMusic() {
    // Logic to upload music and thumbnail
  }

}
