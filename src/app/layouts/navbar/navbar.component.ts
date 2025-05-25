import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModelComponent } from '../../core/shared/components/UI/model/model.component';
import { AuthService } from '../../core/services/user/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, ModelComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  @Input() layout!: string;

  logOut() {
    // Implement logout logic here
    this.authService.signOut();
    // You might want to clear user data, tokens, etc.
    // For example: this.authService.logout();
  }
}
