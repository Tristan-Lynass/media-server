import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Media } from 'src/app/model/media';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public static readonly CHUNK_SIZE = 100;

  private readonly resultsSubject = new ReplaySubject<Observable<Media[]>>();
  private page = -1;
  private finished = false;
  private tags = new Set<string>();

  constructor(private readonly http: HttpClient) { }

  public setTags(tags: Set<string>): void {
    this.page = 0;
    this.tags = tags;
    this.resultsSubject.next(this.getPage());
  }

  public results(): Observable<Observable<Media[]>> {
    return this.resultsSubject;
  }

  public nextPage(): Observable<Media[]> {
    this.page++;
    return this.getPage();
  }

  private getPage(): Observable<Media[]> {

    const options = {
      params: {
        page: this.page,
        size: SearchService.CHUNK_SIZE
      } as { [key: string]: any }
    };

    if (this.tags.size > 0) {
      options.params.tags = Array.from(this.tags);
    }

    return this.http.get('/api/media/search', options).pipe(
      map((res: any) => res.content.map(m => new Media(
        m.id,
        m.ext,
        m.filename,
        m.originalFilename,
        m.thumbnailFilename,
        DateTime.fromSQL(m.uploadedAt),
        m.width,
        m.height,
        m.size,
        m.md5,
        new Set(m.tags)
      )))
    );
  }
}
