import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from 'src/app/models/youtube.models';
import { YoutubeService } from 'src/app/services/youtube.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isDisabled: boolean = false;
  position: number = 1;
  chanelDetails$: Observable<any>;
  videos: Observable<{
    size: number;
    items: Video[];
  }>;

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit(): void {
    this.cargarVideos();
    this.chanelDetails$ = this.youtubeService.getChanel();
  }

  cargarVideos() {
    this.position++;
    this.videos = this.youtubeService.getVideos();
  }

  mostrarVideo(video: Video) {
    Swal.fire({
      html: `
      <h4>${video.title}</h4>
      <hr>
        <iframe 
        width="100%" 
        height="315" 
        src="https://www.youtube.com/embed/${video.resourceId.videoId}" 
        frameborder="0"
        allow="accelerometer; 
        autoplay; clipboard-write;
         encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `,
    });
  }
  verificarTope(tope: number) {
    return !(this.position <= tope);
  }
}
