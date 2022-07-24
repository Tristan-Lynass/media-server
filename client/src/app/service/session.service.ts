import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { buffer, bufferCount, map, publish, publishReplay, refCount, share, shareReplay, switchMap, takeWhile, tap, withLatestFrom } from 'rxjs/operators';
import { isDefined, Nullable } from 'src/app/lang-util';
import { User } from 'src/app/model/user';
import { XsrfService } from 'src/app/service/xsrf.service';

interface Json$User {
  id: string;
  username: string;
  admin: boolean;
}

@Injectable({ providedIn: 'root' })
export class SessionService {

  // Needs to be replay because of Guard services dynamically subscribing on url change
  // Also needs to be replay so late template subscribers can get the latest value
  private readonly userSubject = new ReplaySubject<Nullable<User>>(1);

  readonly isLoggedIn$ = this.userSubject.pipe(
    map(isDefined),
  );

  readonly user$ = this.userSubject.asObservable();

  constructor(private readonly http: HttpClient,
              private readonly router: Router,
              private readonly xsrfService: XsrfService) {
    this.getUser().subscribe(
      user => this.userSubject.next(user),
      () => this.userSubject.next(null)
    );
  }

  public login(username: string, password: string): Observable<boolean> {
    const formData: any = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.xsrfService.xsrf().pipe(
      switchMap(_ => this.http.post('/api/auth/login', formData)),
      switchMap(_ => this.getUser()),
      tap(user => this.userSubject.next(user)),
      switchMap(_ => fromPromise(this.router.navigate([ '/secure' ])))
    );
  }

  public logout(): Observable<boolean> {
    return this.http.post('/api/auth/logout', '').pipe(
      // catchError(err => console.log('Could not log out:', err)),
      tap(() => this.userSubject.next(null)),
      switchMap(_ => fromPromise(this.router.navigate([ 'login' ])))
    );
  }

  private getUser(): Observable<User> {
    return this.xsrfService.xsrf().pipe(
      switchMap(() => this.http.get('/api/user')),
      map((user: Json$User) => new User(user.id, user.username, user.admin))
    );
  }

}
