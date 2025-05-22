import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-userlayout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './userlayout.component.html',
  styleUrl: './userlayout.component.css',
})
export class UserlayoutComponent {}
