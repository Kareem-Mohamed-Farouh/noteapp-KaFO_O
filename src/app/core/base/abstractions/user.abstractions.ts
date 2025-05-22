import { Observable } from 'rxjs';

export abstract class UserAbstract {
  abstract addNote(data: any): Observable<any>;
  abstract getAllUsersNotes(): Observable<any>;
  abstract getUserNotes(): Observable<any>;
  abstract deleteNote(idNote: string): Observable<any>;
  abstract updateNote(idNote: string, dataNote: object): Observable<any>;
}
