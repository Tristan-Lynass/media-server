import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  // Have an appendable list for uploads
  private x: Observable<Observable<HttpEvent<any>>[]>;

  constructor() { }

  public getUploadProgress() {
    // upload

    // async pipe
  }

  public upload(files): void {
    // this.x.push();
  }
}
