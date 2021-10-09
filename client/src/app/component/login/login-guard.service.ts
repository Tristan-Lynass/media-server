import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoginGuardService implements CanActivate {

  constructor(private readonly sessionService: SessionService,
              private readonly router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.sessionService.isLoggedIn$.pipe(
      switchMap(isLoggedIn => isLoggedIn
        ? fromPromise(this.router.navigate(['secure']))
        : of(true))
    );
  }
}
