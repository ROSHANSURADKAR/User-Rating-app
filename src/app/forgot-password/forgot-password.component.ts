import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  submit() {
    this.successMessage = '';
    this.errorMessage = '';

    // Extra safety validation on the TS side
    if (!this.email.trim()) {
      this.errorMessage = 'Email is required.';
      return;
    }

    // (Optional) validate email format on TS side too
    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.loading = true;

    this.apiService.requestPasswordReset(this.email.trim()).subscribe({
      next: () => {
        this.successMessage = 'Check your email for the reset link!';
        this.email = '';
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error sending reset email. Please try again.';
        this.loading = false;
      }
    });
  }

  private isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }
}
