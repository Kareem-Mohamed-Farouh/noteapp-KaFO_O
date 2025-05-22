import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../base/environments/urls.environment';
import { authEndpoints } from '../../enums/auth.endpoint';
import { AuthAbstraction } from '../../base/abstractions/auth.abstraction';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthAbstraction {
  private readonly httpClient = inject(HttpClient);
  constructor() {}

  signUp(userdata: object): Observable<any> {
    return this.httpClient.post(
      `${environment.mainUrl}${authEndpoints.signup}`,
      userdata
    );
  }
  signIn(userdata: object): Observable<any> {
    return this.httpClient.post(
      `${environment.mainUrl}${authEndpoints.signin}`,
      userdata
    );
  }
}
