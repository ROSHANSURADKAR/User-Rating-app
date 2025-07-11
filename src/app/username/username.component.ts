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

    if (!this.newFirstName.trim() || !this.newLastName.trim()) {
      this.errorMessage = 'First name and Last name are required.';
      return;
    }

    const userData = localStorage.getItem('user');
    if (!userData) {
      this.errorMessage = 'User not logged in!';
      return;
    }

    const user = JSON.parse(userData);
    const email = user.email;

    // Call backend API
    this.apiService.updateUsername(email, this.capitalize(this.newFirstName), this.capitalize(this.newLastName))
      .subscribe({
        next: (res) => {
          // Update localStorage
          user.first_name = this.capitalize(this.newFirstName);
          user.last_name = this.capitalize(this.newLastName);
          localStorage.setItem('user', JSON.stringify(user));

          this.successMessage = 'Username updated successfully!';
          setTimeout(() => {
            this.router.navigate(['/submitrating']);
          }, 1500);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to update username. Please try again.';
        }
      });
  }

  private capitalize(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}