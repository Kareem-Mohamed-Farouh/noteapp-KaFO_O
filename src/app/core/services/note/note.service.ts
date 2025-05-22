import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../base/environments/urls.environment';
import { userEndpoints } from '../../enums/user.endpoint';
import { UserAbstract } from '../../base/abstractions/user.abstractions';

@Injectable({
  providedIn: 'root',
})
export class NoteService implements UserAbstract {
  private readonly httpClient = inject(HttpClient);
  constructor() {}

  addNote(data: any): Observable<any> {
    return this.httpClient.post(
      `${environment.mainUrl}${userEndpoints.addnote}`,
      data
    );
  }

  getAllUsersNotes(): Observable<any> {
    return this.httpClient.get(
      `${environment.mainUrl}${userEndpoints.getallnotes}`
    );
  }
  getUserNotes(): Observable<any> {
    return this.httpClient.get(
      `${environment.mainUrl}${userEndpoints.getUserNotes}`
    );
  }

  updateNote(idNote: string, dataNote: object): Observable<any> {
    return this.httpClient.put(
      `${environment.mainUrl}${userEndpoints.updateNote}${idNote}`,
      dataNote
    );
  }

  deleteNote(idNote: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.mainUrl}${userEndpoints.deleteNote}${idNote}`,
      {}
    );
  }
}
