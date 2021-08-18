import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private static readonly CHUNK_SIZE = 100;

  private xx: Observable<Media[]>;

  constructor(private readonly http: HttpClient) { }

  public findAll(): Observable<Media[]> {
    // if (this.xx != null) {
    //   this.xx.complete();
    // }

    this.xx = this.http.get('http://localhost:3000/api/uploads', {
      params: {
        page: 0,
        size: SearchService.CHUNK_SIZE
      }
    }).pipe(
      map((res: any[]) => res.map(m => new Media(m.filename, m.ext )))
    );

    return this.xx;
  }

  public loadPage(){}
}

export class Media {
  readonly thumbnailUrl: string;
  constructor(readonly id: string, readonly extensions: string) {
    this.thumbnailUrl = `http://localhost:3000/uploads/thumbs/${id}.jpg`;
  }
}
