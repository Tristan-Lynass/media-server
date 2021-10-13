import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map, switchMap, tap } from 'rxjs/operators';
import { isDefined, Nullable } from 'src/app/lang-util';
import { User } from 'src/app/model/user';
import { XsrfService } from 'src/app/service/xsrf.service';

@Injectable({ providedIn: 'root' })
export class SessionService {

  private readonly userSubject = new BehaviorSubject<Nullable<User>>(null);

  readonly isLoggedIn$ = this.userSubject.pipe(
    map(isDefined)
  );

  readonly user$ = this.userSubject.asObservable();

  get user(): Nullable<User> {
    return this.userSubject.getValue();
  }

  constructor(private readonly http: HttpClient,
              private readonly router: Router,
              private readonly xsrfService: XsrfService) {

  }

  public login(username: string, password: string): Observable<boolean> {
    const formData: any = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.xsrfService.xsrf().pipe(
      switchMap(_ => this.http.post('/api/login', formData)),
      switchMap(_ => this.http.get('/api/user')),
      tap((user: Json$User) => this.userSubject.next(new User(user.id, user.username, user.isAdmin))), // TODO: push to userSubject
      switchMap(_ => fromPromise(this.router.navigate([ '/secure' ])))
    );
  }

  public logout(): void {
    this.http.post('/api/logout', '').pipe(
      switchMap(_ => fromPromise(this.router.navigate([ '/login' ])))
    );
  }

}


interface Json$User {
  id: string;
  username: string;
  isAdmin: boolean;
}
