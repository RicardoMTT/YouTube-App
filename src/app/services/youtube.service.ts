import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Video, YoutubeResponse } from '../models/youtube.models';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  videos: Video[] = [];
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  //Lista de reproduccion
  private playlist = 'OLAK5uy_lH7jrlcfWi4s682Z9gDupYf1iW-qAQ3hQ';

  //Esta API Key esta en el proyecto Watuy
  private apiKey = 'AIzaSyBD8gI9W3GnLJrHVGobeMjYJ6lA1XQCkMw';
  private nextPageToken = '';
  constructor(private http: HttpClient) {}

  getChanel() {
    const url = `${this.youtubeUrl}/channels`;
    const params = new HttpParams()
      .set('part', 'snippet,statistics ')
      .set('key', this.apiKey)
      .set('id', 'UCdI8MAC5HoPJSJ4zrgDDI-Q')
      .set('maxResults', '5');

    return this.http.get(url, { params }).pipe(tap((res) => console.log(res)));
  }

  searchYoutubeAPI(keyword) {
    const url = `${this.youtubeUrl}/search`;
    const params = new HttpParams()
      .set('part', 'id')
      .set('part', 'snippet')
      .set('key', this.apiKey)
      .set('maxResults', '10')
      .set('q', keyword)
      .set('pageToken', this.nextPageToken);
    return this.http
      .get<YoutubeResponse>(url, { params })
      .pipe(tap((val) => console.log(val)));
  }
  getVideos() {
    const url = `${this.youtubeUrl}/playlistItems`;
    console.log('nextPageToken', this.nextPageToken);

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('key', this.apiKey)
      .set('maxResults', '10')
      .set('playlistId', this.playlist)
      .set('pageToken', this.nextPageToken);
    return this.http.get<YoutubeResponse>(url, { params }).pipe(
      map((response) => {
        const numberPages = Math.ceil(
          response.pageInfo.totalResults / response.pageInfo.resultsPerPage
        );
        console.log('responsss', response);

        this.nextPageToken = response.nextPageToken;
        return {
          items: response.items,
          pagesNumbers: numberPages,
        };
      }),
      map((items) => {
        const arreglo = items.items.map((item) => item.snippet);
        this.videos.push(...arreglo);
        return {
          size: items.pagesNumbers,
          items: this.videos,
        };
      })
    );
  }
}
