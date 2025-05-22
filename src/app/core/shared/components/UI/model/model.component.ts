import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-model',
  imports: [],
  templateUrl: './model.component.html',
  styleUrl: './model.component.css',
})
export class ModelComponent {
  @Input() numberModel!: string;
}
