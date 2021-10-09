import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { switchMap } from 'rxjs/operators';
import { SessionService } from 'src/app/service/session.service';

@Injectable({ providedIn: 'root' })
export class SecureAreaGuardService implements CanActivate {

  constructor(private readonly sessionService: SessionService,
              private readonly router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.sessionService.isLoggedIn$.pipe(
      switchMap(isLoggedIn => isLoggedIn
        ? of(true)
        : fromPromise(this.router.navigate([ 'login' ])))
    );
  }
}
