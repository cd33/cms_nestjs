import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  showMenu = false;

  constructor(public readonly authService: AuthService) {}

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }
}
