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
  private page = 0;

  constructor(private readonly http: HttpClient) { }

  public search(tags: string[]): Observable<Media[]> {
    this.page = 0;
    return this.getPage();
  }

  public nextPage(): Observable<Media[]> {
    this.page++;
    return this.getPage();
  }

  private getPage(): Observable<Media[]> {
    // if (this.xx != null) {
    //   this.xx.complete();
    // }

    this.xx = this.http.get('http://localhost:3000/api/uploads', {
      params: {
        page: this.page,
        size: SearchService.CHUNK_SIZE
      }
    }).pipe(
      map((res: any[]) => res.map(m => new Media(m.filename, m.ext )))
    );

    return this.xx;
  }

}

export class Media {
  readonly thumbnailUrl: string;
  readonly url: string;
  constructor(readonly id: string, readonly extension: string) {
    this.thumbnailUrl = `http://localhost:3000/uploads/thumbs/${id}.jpg`;
    this.url = `http://localhost:3000/uploads/${id}.${extension}`;
  }
}
