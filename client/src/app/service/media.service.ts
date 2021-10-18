import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from 'src/app/model/media';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private static readonly JSON = {
    headers: new HttpHeaders({
      'Accept' : 'application/json',
      'Content-Type': 'application/json'
    })
  };
  private static readonly FORM_DATA = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };
  constructor(private readonly http: HttpClient) {
  }

  // FIXME: https://stackoverflow.com/questions/36208732/angular-2-http-post-is-not-sending-the-request
  addTag(media: Media[], tag: string): Observable<any> {
    const data = new FormData()
    data.set('media', JSON.stringify(media.map(m => m.id)));
    data.set('tag', tag);

    return this.http.put('/api/media/tag', { media: media.map(m => m.id), tag }, MediaService.FORM_DATA);
  }

  removeTag(media: Media[], tag: string): Observable<any> {
    return this.http.delete('/api/media/tag', {
        params: {
          media: media.map(m => m.id),
          tag
        }
      });
  }
}
