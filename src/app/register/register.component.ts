import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    address: '',
    phone_number: ''
  };

  otpSent: boolean = false;
  emailForOtp = '';
  otp = '';

  submitted: boolean = false;
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  register(form: any) {
    this.submitted = true;
    this.errorMessage = '';

    if (form.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    // Additional validations
    if (!this.isAlpha(this.user.first_name) || !this.isAlpha(this.user.last_name)) {
      this.errorMessage = 'First and Last names must contain only letters.';
      return;
    }

    if (!this.isValidEmail(this.user.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    if (this.user.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
      return;
    }

    if (this.user.password !== this.user.confirm_password) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (!this.user.address.trim()) {
      this.errorMessage = 'Address is required.';
      return;
    }

    if (!this.isValidPhone(this.user.phone_number)) {
      this.errorMessage = 'Phone number must contain only digits.';
      return;
    }

    // Call backend
    this.apiService.registerUser(this.user).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.otpSent = true;
        this.emailForOtp = this.user.email;
      },
      error: err => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Registration failed.';
      }
    });
  }

  verifyOtp() {
    if (!this.otp.trim()) {
      this.errorMessage = 'Please enter the OTP.';
      return;
    }

    this.apiService.verifyUserOtp({ email: this.emailForOtp, otp: this.otp }).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error(err);
        this.errorMessage = err.error?.message || 'OTP verification failed.';
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  private isAlpha(value: string): boolean {
    return /^[a-zA-Z]+$/.test(value.trim());
  }

  private isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  private isValidPhone(value: string): boolean {
    return /^[0-9]{6,15}$/.test(value.trim()); // adjust length as needed
  }
}
