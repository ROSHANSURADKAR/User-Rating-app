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
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  registrationMessage: string = '';
  otp: string = '';  // OTP field
  showOtpInput: boolean = false;  // To show OTP input field after registration
  registrationSuccess: boolean = false;  // To track registration success

  constructor(private apiService: ApiService, private router: Router) {}

  registerAdmin() {
    if (this.password !== this.confirmPassword) {
      this.registrationMessage = 'Passwords do not match!';
      return;
    }

    // Call the API to register the admin
    this.apiService.registerAdmin(this.name, this.email, this.password).subscribe(
      (response) => {
        alert('Registration successful! An OTP has been sent to your email.');
        this.registrationSuccess = true;
        this.showOtpInput = true; // Show OTP input field
      },
      (error) => {
        this.registrationMessage = 'Registration failed. Please try again.';
        console.error('Error during registration:', error);
      }
    );
  }

  // Function to handle OTP verification
  verifyOtp() {
    this.apiService.verifyAdminOtp(this.email, this.otp).subscribe(
      (response) => {
        alert('OTP verified successfully! You can now log in.');
        this.router.navigate(['/admin-login']); // Redirect to login after successful OTP verification
      },
      (error) => {
        alert('OTP verification failed. Please try again.');
        console.error('Error during OTP verification:', error);
      }
    );
  }
}
