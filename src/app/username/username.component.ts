import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-username',
  standalone: false,
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent {
  newFirstName: string = '';
  newLastName: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  submit() {
    this.errorMessage = '';
    this.successMessage = '';

    // Trim input
    const first = this.newFirstName.trim();
    const last = this.newLastName.trim();

    // Validation: required
    if (!first || !last) {
      this.errorMessage = 'First name and Last name are required.';
      return;
    }

    // Validation: only letters
    const letterRegex = /^[a-zA-Z]+$/;
    if (!letterRegex.test(first) || !letterRegex.test(last)) {
      this.errorMessage = 'First name and Last name must contain only letters.';
      return;
    }

    // Check logged-in user
    const userData = localStorage.getItem('user');
    if (!userData) {
      this.errorMessage = 'User not logged in!';
      return;
    }

    const user = JSON.parse(userData);
    const email = user.email;

    // Call backend to update
    this.apiService.updateUsername(email, this.capitalize(first), this.capitalize(last))
      .subscribe({
        next: () => {
          // Update localStorage
          user.first_name = this.capitalize(first);
          user.last_name = this.capitalize(last);
          localStorage.setItem('user', JSON.stringify(user));

          this.successMessage = 'Username updated successfully!';
          setTimeout(() => {
            this.router.navigate(['/submitrating']);
          }, 1500);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = err?.error?.message || 'Failed to update username. Please try again.';
        }
      });
  }

  private capitalize(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
}
