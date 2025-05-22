import { Observable } from 'rxjs';

export abstract class AuthAbstraction {
  abstract signUp(userdata: object): Observable<any>;
  abstract signIn(userdata: object): Observable<any>;
}
