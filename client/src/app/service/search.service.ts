import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Media } from 'src/app/model/media';

/**
 * Needs to be a stateful service, because multiple de-coupled components need to use this.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public static readonly CHUNK_SIZE = 100;

  private readonly resultsSubject = new ReplaySubject<Observable<Media[]>>(1);
  private page: number;
  private tags: Set<string>;

  constructor(private readonly http: HttpClient) {
    this.setTags(new Set<string>());
  }

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
      map((res: any) => res.map(m => new Media(
        m.id,
        m.extension,
        m.original_filename,
        DateTime.fromISO(m.created_at),
        m.width,
        m.height,
        m.size,
        m.md5,
        new Set(m.tags)
      )))
    );
  }
}
