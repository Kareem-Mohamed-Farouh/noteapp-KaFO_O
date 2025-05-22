import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ButtonComponent } from '../../core/shared/components/UI/button/button.component';
import { ModelComponent } from '../../core/shared/components/UI/model/model.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NoteService } from '../../core/services/note/note.service';
import { ToastrService } from 'ngx-toastr';
import { IUsernotedata } from '../../core/interfaces/usernotedata';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, ModelComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private noteService = inject(NoteService);
  dataOfNote: WritableSignal<IUsernotedata[]> = signal([]);
  addNoteForm!: FormGroup;
  updateNoteForm!: FormGroup;

  ngOnInit(): void {
    this.addFormVlidate();
    this.updateFormVlidate();
  }
  addFormVlidate(): void {
    this.addNoteForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      content: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  updateFormVlidate(): void {
    this.updateNoteForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      content: [null, [Validators.required, Validators.minLength(3)]],
    });
    this.displayMyNote();
  }

  addNewNote(): void {
    console.log(this.addNoteForm.value);
    if (this.addNoteForm.valid) {
      this.noteService.addNote(this.addNoteForm.value).subscribe({
        next: (res) => {
          console.log(res.msg === 'done');
          if (res.msg === 'done') {
            this.toastr.success('your Note Added successfuly');
            this.displayMyNote();
            this.clearForm(this.addNoteForm);
          }
        },
      });
    } else {
      this.toastr.error('Each input must contain atleast 3 character');
    }
  }

  displayMyNote(): void {
    this.noteService.getUserNotes().subscribe({
      next: (res) => {
        console.log('mynote', res);
        if (res.msg === 'done') {
          this.dataOfNote.set(res.notes);
        }
      },
      error: (err) => {
        console.log(err);

        if (err == undefined) {
          this.dataOfNote.set([]);
          // console.log('mashy ya kemo');
          // this.toastr.success('Add New Notes');
        }
      },
    });
  }

  deleteNote(noteId: string): void {
    this.noteService.deleteNote(noteId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.msg === 'done') {
          this.toastr.success('your note deleted succesfully');

          this.displayMyNote();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  noteId: WritableSignal<string> = signal('');
  noteCardId(noteId: string): void {
    this.noteId.set(noteId);
  }

  retriveDataToForm(title: string, content: string): void {
    this.updateNoteForm.get('title')?.patchValue(title);
    this.updateNoteForm.get('content')?.patchValue(content);
  }

  submittUpdateForm(): void {
    if (this.updateNoteForm.value) {
      this.noteService
        .updateNote(this.noteId(), this.updateNoteForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.updateNoteForm.reset();
            this.displayMyNote();
          },
        });
    }
  }

  clearForm(spicificForm: FormGroup) {
    spicificForm.reset();
  }
}
