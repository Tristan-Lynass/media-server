import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from 'src/app/service/search.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private static readonly HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private readonly http: HttpClient) {
  }

  // FIXME: https://stackoverflow.com/questions/36208732/angular-2-http-post-is-not-sending-the-request
  addTag(media: Media[], tag: string): Observable<any> {
    return this.http.post('http://localhost:3000/api/media/tag', { media: media.map(m => m.id), tag }, MediaService.HTTP_OPTIONS);
  }

  removeTag(media: Media[], tag: string): Observable<any> {
    return this.http.delete('http://localhost:3000/api/media/tag', {
        params: {
          media: media.map(m => m.id),
          tag
        }
      });
  }
}
