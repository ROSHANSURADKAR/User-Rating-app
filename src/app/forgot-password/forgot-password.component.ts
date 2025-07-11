import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: false,  // ✅ false if used in declarations
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']  // ✅ fixed typo
})
export class ForgotPasswordComponent {
  email = '';
  successMessage = '';
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  submit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.email.trim()) {
      this.errorMessage = 'Email is required.';
      return;
    }

    this.apiService.requestPasswordReset(this.email).subscribe({
      next: () => {
        this.successMessage = 'Check your email for the reset link!';
        this.email = '';
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error sending reset email';
      }
    });
  }
}
