import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { isDefined } from 'src/app/lang-util';

/* https://spring.io/guides/tutorials/spring-security-and-angular-js/ for details */
@Injectable({ providedIn: 'root' })
export class XsrfService {

  readonly headerName = 'X-XSRF-TOKEN';

  constructor(private readonly http: HttpClient,
              private readonly cookie: CookieService) {
  }

  get token(): string {
    return this.cookie.get('XSRF-TOKEN');
  }

  xsrf(): Observable<string> {
    const xsrf = this.token;
    return isDefined(xsrf)
      ? of(xsrf)
      : this.http.get('api/xsrf').pipe(map(() => this.token));
  }
}
