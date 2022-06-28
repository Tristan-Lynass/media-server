import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { isDefined } from 'src/app/lang-util';

/* https://spring.io/guides/tutorials/spring-security-and-angular-js/ for details */
/**
 * If we're not authenticated, we need to get the server to set XSRF-TOKEN by initiating our first interaction with it.
 */
@Injectable({ providedIn: 'root' })
export class XsrfService {

  // readonly headerName = 'X-XSRF-TOKEN';

  constructor(private readonly http: HttpClient,
              private readonly cookie: CookieService) {
  }

  get token(): string {
    return this.cookie.get('XSRF-TOKEN');
  }

  xsrf(): Observable<string> {
    const xsrf = this.token;
    return xsrf?.trim() !== '' ?? false
      ? of(xsrf)
      : this.http.get('/api/auth/xsrf').pipe(
        map(() => this.token),
        catchError(() => this.token) // FIXME: I think this is a workaround to a cookie issue. Needed for when you log out then try logging back in again
      );
  }
}
