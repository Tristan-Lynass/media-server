import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SequentialUploadService {

  // Have an appendable list for uploads
  // private x: Observable<Observable<HttpEvent<any>>[]>;

  private queue: File[] = [];
  private current: File | undefined;

  constructor(private readonly http: HttpClient) {
  }

  public upload(files: File[]): void {
    this.queue.push(...files);

    if (this.current == null) {
      this.xxxx();
    }
  }

  private xxxx(): void {
    // start the upload because nothing is uploading right now
    this.current = this.queue.pop();
    if (this.current == null) {
      return;
    }
    const formData = new FormData();
    formData.append('media', this.current);

    this.http.post('http://localhost:3000/uploads', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(y => {
      if (y.type === HttpEventType.Response) {
        this.xxxx();
      } else if (y.type === HttpEventType.UploadProgress) {
        console.log(Math.round(y.loaded / y.total * 100));
      }
    });
  }

  // public upload(files): void {
  //   // this.x.push();
  // }
}
