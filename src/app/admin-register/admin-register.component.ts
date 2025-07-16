import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-register',
  standalone: false,
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  // Form Fields
  first_name = '';
  last_name = '';
  email = '';
  phone_number = '';
  address = '';
  password = '';
  confirm_password = '';
  otp = '';

  // UI Control
  showOtpBox = false;
  message = '';
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  registerAdmin() {
    this.errorMessage = '';
    this.message = '';

    // ✅ Field-level Validation
    if (!this.first_name.trim() || !this.last_name.trim() || !this.email.trim() ||
        !this.password || !this.confirm_password || !this.phone_number.trim() || !this.address.trim()) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (!this.isAlpha(this.first_name) || !this.isAlpha(this.last_name)) {
      this.errorMessage = 'First and Last names must contain only letters.';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    if (!/^[0-9]{10}$/.test(this.phone_number)) {
      this.errorMessage = 'Phone number must be exactly 10 digits.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
      return;
    }

    if (this.password !== this.confirm_password) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // ✅ Prepare Data
    const adminData = {
      first_name: this.capitalize(this.first_name),
      last_name: this.capitalize(this.last_name),
      email: this.email.trim(),
      password: this.password,
      confirm_password: this.confirm_password,
      phone_number: this.phone_number.trim(),
      address: this.address.trim()
    };

    // ✅ API Call
    this.apiService.adminRegister(adminData).subscribe(
      (response: any) => {
        this.showOtpBox = true;
        this.message = response.message || 'OTP sent to your email. Please verify.';
      },
      (error: any) => {
        console.error(error);
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      }
    );
  }

  verifyOtp() {
    this.errorMessage = '';
    this.message = '';

    if (!this.otp.trim()) {
      this.errorMessage = 'Please enter the OTP.';
      return;
    }

    this.apiService.verifyOtp(this.email, this.otp).subscribe(
      (response: any) => {
        this.router.navigate(['/admin-login']);
      },
      (error) => {
        console.error(error);
        this.errorMessage = error.error?.message || 'OTP verification failed!';
      }
    );
  }

  goToadminRegister() {
    this.router.navigate(['/admin-login']);
  }

  // ✅ Utility Methods
  private isAlpha(value: string): boolean {
    return /^[a-zA-Z]+$/.test(value.trim());
  }

  private isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  private capitalize(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
