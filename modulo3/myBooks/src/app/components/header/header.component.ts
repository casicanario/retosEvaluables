// src/app/components/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
    this.isMenuOpen = false;
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
    this.isMenuOpen = false;
  }

  navigateToBooks(): void {
    this.router.navigate(['/books']);
    this.isMenuOpen = false;
  }
}