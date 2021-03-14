import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Video, YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  videos: Video[] = [];
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private playlist = 'UUdI8MAC5HoPJSJ4zrgDDI-Q';
  private apiKey = 'AIzaSyBRhlAGy5HQ4V5IStPk8FypO1AWwilbjmY';
  private nextPageToken = '';
  constructor(private http: HttpClient) {}

  getVideos() {
    const url = `${this.youtubeUrl}/playlistItems`;
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('key', this.apiKey)
      .set('maxResults', '10')
      .set('playlistId', this.playlist)
      .set('pageToken', this.nextPageToken);
    return this.http
      .get<YoutubeResponse>(url, { params })
      .pipe(
        map((response) => {
          const numberPages = Math.ceil(
            response.pageInfo.totalResults / response.pageInfo.resultsPerPage
          );
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
