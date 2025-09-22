import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(private router: Router) {}

  ayud(): void {
    console.log('MyBooks logo clicked');
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
    this.closeMenu();
  }

  navigateToAddBook(): void {
    this.router.navigate(['/add-book']);
    this.closeMenu();
  }

  navigateToUpdateBook(): void {
    // Por ahora redirige a books, se implementará UpdateBook más adelante
    this.router.navigate(['/books']);
    this.closeMenu();
  }

  navigateToBooks(): void {
    this.router.navigate(['/books']);
    this.closeMenu();
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
    this.closeMenu();
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
    this.closeMenu();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private closeMenu(): void {
    this.isMenuOpen = false;
  }
}
