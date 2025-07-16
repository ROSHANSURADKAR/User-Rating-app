import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  standalone: false,
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  submit() {
    // Clear previous messages
    this.errorMessage = '';
    this.successMessage = '';

    // Check if all fields are filled
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    // Check new password length
    if (this.newPassword.length < 8) {
      this.errorMessage = 'New password must be at least 8 characters.';
      return;
    }

    // Check if new and confirm passwords match
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      this.errorMessage = 'User not logged in!';
      return;
    }

    const user = JSON.parse(userData);

    // Call API to change password
    this.apiService.changePassword(user.email, this.currentPassword, this.newPassword)
      .subscribe(
        () => {
          this.successMessage = 'Password changed successfully!';
          // Optional redirect after success
          setTimeout(() => this.router.navigate(['/submitrating']), 1500);
        },
        (err) => {
          this.errorMessage = err.error?.message || 'Error changing password.';
        }
      );
  }
}
