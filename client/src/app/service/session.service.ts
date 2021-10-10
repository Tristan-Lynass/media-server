import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map, switchMap } from 'rxjs/operators';
import { isDefined, Nullable } from 'src/app/lang-util';
import { User } from 'src/app/model/user';

@Injectable({ providedIn: 'root' })
export class SessionService {

  private readonly userSubject = new BehaviorSubject<Nullable<User>>(null);

  readonly isLoggedIn$ = this.userSubject.pipe(
    map(isDefined)
  );

  readonly user$ = this.userSubject.asObservable();

  get user(): User | undefined {
    return this.userSubject.getValue();
  }

  constructor(private readonly http: HttpClient,
              private readonly router: Router) {

  }

  public login(username: string, password: string): Observable<boolean> {
    return this.http.post('api/login', '').pipe(
      switchMap(_ => fromPromise(this.router.navigate([ '/secure' ])))
    );
    // push to userSubject
  }

  public logout(): void {
    this.http.post('api/logout', '').pipe(
      switchMap(_ => fromPromise(this.router.navigate([ '/login' ])))
    );
  }

}
