import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuDrawerService {

  private readonly toggleSubject = new Subject();

  public readonly toggle$ = this.toggleSubject.asObservable();

  public toggle(): void {
    this.toggleSubject.next();
  }
}
