import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SequentialUploadService {

  // Have an observable with an array of requests
  private readonly progress = new BehaviorSubject<UploadProgress[]>([]);

  public getProgress(): Observable<UploadProgress[]> {
    return this.progress.asObservable();
  }

  constructor(private readonly http: HttpClient) {
  }

  private update(id: string, loaded: number, total: number | undefined): void {
    const current = this.progress.value;
    const index = current.findIndex(p => p.id = id);
    if (index != null) {
      current[index].loaded = loaded;
      current[index].total = total;
      this.progress.next(current);
    } else {
      console.log('ERROR: Unable to find upload with id: ' + id);
    }
  }

  private remove(id: string): void {
    const current = this.progress.value;
    this.progress.next(current.filter(p => p.id === id));
  }

  private add(progress: UploadProgress): void {
    const current = this.progress.value;
    current.push(progress);
    this.progress.next(current);
  }

  public uploadAll(files: File[]): void {
    files.forEach(file => {
      const progress: UploadProgress = { id: uuid(), loaded: 0, total: undefined, filename: file.name };
      this.add(progress);
      this.upload(file).subscribe((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          // console.log(`Updating ${progress.id}: ${event.loaded} / ${progress.total} = ${100 * (event.loaded / progress.total)}`);
          this.update(progress.id, event.loaded, event.total);
        } else if (event.type === HttpEventType.Response) {
          console.log('Uploaded the file successfully: ' + file.name);
          this.update(progress.id, progress.total, progress.total);
          // this.remove(progress.id);
        }
      }, () => {
      });
    });
  }
        //     (err: any) => {
        //       this.progressInfos[idx].value = 0;
        //       const msg = 'Could not upload the file: ' + file.name;
        //       this.message.push(msg);
        //       this.fileInfos = this.uploadService.getFiles();
  //     });
  //   });
  // }

  private upload(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('media', file);
    return this.http.post('http://localhost:3000/uploads', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // private xxxx(): void {
  //   // start the upload because nothing is uploading right now
  //   this.current = this.queue.pop();
  //   if (this.current == null) {
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append('media', this.current);
  //
  //   this.http.post('http://localhost:3000/uploads', formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   }).subscribe(y => {
  //     if (y.type === HttpEventType.Response) {
  //       this.xxxx();
  //     } else if (y.type === HttpEventType.UploadProgress) {
  //       console.log(Math.round(y.loaded / y.total * 100));
  //     }
  //   });
  // }

}

export interface UploadProgress {
  id: string;
  loaded: number;
  total: number | undefined;
  filename: string;
}
