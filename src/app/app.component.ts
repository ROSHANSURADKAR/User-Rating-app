import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css'] // Fixed typo: should be 'styleUrls' not 'styleUrl'
})
export class AppComponent {
  constructor(private router: Router) {}

  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    alert('Logged out successfully!');
    this.router.navigate(['/login']); // 🔥 Redirect to Login Page
  }
  isLoggedIn1() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout2() {
    localStorage.removeItem('isLoggedIn');
    alert('Logged out successfully!');
    this.router.navigate(['/admin-login']); // 🔥 Redirect to Login Page
  }
}
