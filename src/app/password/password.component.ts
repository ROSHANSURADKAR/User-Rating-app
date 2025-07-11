import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  standalone: false,
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {
currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  submit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (!this.currentPassword || !this.newPassword) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    const userData = localStorage.getItem('user');
    if (!userData) {
      this.errorMessage = 'User not logged in!';
      return;
    }

    const user = JSON.parse(userData);

    this.apiService.changePassword(user.email, this.currentPassword, this.newPassword)
      .subscribe(
        () => {
          this.successMessage = 'Password changed successfully!';
          setTimeout(() => this.router.navigate(['/submitrating']), 1500);
        },
        (err) => {
          this.errorMessage = err.error.message || 'Error changing password.';
        }
      );
  }

}
