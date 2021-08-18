import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UploadProgress } from 'src/app/upload-progress';
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
    const index = current.findIndex(p => p.id === id);
    if (index != null) {
      current[index] = current[index].update(loaded, total);
      this.progress.next(current);
    } else {
      console.log('ERROR: Unable to find upload with id: ' + id);
    }
  }

  private finish(id: string): void {
    const current = this.progress.value;
    const index = current.findIndex(p => p.id === id);
    if (index != null) {
      const progress = current[index];
      current[index] = progress.update(progress.total, progress.total);
      this.progress.next(current);
    } else {
      console.log('ERROR: Unable to find upload with id: ' + id);
    }
  }

  private remove(id: string): void {
    const current = this.progress.value;
    this.progress.next(current.filter(p => p.id === id));
  }

  private queueUpload(filename: string): string {
    const id = uuid();
    const current = this.progress.value;
    current.push(new UploadProgress(id, 0, undefined, filename));
    this.progress.next(current);

    return id;
  }

  public uploadAll(files: File[]): void {
    files.forEach(file => {
      const id = this.queueUpload(file.name);

      this.upload(file).subscribe((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          // console.log(`Updating ${progress.id}: ${event.loaded} / ${progress.total} = ${100 * (event.loaded / progress.total)}`);
          this.update(id, event.loaded, event.total);
        } else if (event.type === HttpEventType.Response) {
          console.log('Uploaded the file successfully: ' + file.name);
          this.finish(id);
          // this.update(progress.id, progress.total, progress.total);
          // this.remove(progress.id);
        }
      }, () => {
        console.log('FAILED TO UPLOAD', id);
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
    return this.http.post('http://localhost:3000/api/uploads', formData, {
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
