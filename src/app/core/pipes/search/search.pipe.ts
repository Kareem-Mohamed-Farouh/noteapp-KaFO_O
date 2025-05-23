import { Pipe, PipeTransform } from '@angular/core';
import { IUsernotedata } from '../../interfaces/usernotedata';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(dataOfNote: IUsernotedata[], value: string): any {
    console.log(dataOfNote, value);
    return dataOfNote.filter((note) =>
      note.title.toLowerCase().includes(value.toLowerCase())
    );
    console.log(dataOfNote, value);
  }
}
