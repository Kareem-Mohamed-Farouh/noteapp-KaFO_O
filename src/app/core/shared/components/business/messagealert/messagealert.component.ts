import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-messagealert',
  imports: [],
  templateUrl: './messagealert.component.html',
  styleUrl: './messagealert.component.css',
})
export class MessagealertComponent {
  @Input() dataInput!: string;
}
