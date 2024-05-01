import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent {

  thumbnailUrl: string = '';
  musicFile!: File;

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    this.musicFile = event.target.files[0];
  }

  onThumbnailSelected(event: any) {
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
    const formData = new FormData();
    formData.append('username', 'alice');
    formData.append('filename', this.musicFile.name);
    formData.append('file_path', this.musicFile);
    formData.append('points', '0');

    this.http.post('http://127.0.0.1:5000/upload', formData)
      .subscribe(
        response => {
          console.log('File uploaded successfully:', response);
        },
        error => {
          console.error('Error uploading file:', error);
        }
      );
  }
}
