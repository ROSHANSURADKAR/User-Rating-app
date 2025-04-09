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
  name = '';
  email = '';
  password = '';
  otp = '';
  showOtpBox = false;
  message = '';

  constructor(private apiService: ApiService) {}

  registerAdmin() {
    const adminData = { name: this.name, email: this.email, password: this.password };
    this.apiService.adminRegister(adminData).subscribe(
      (response: any) => {
        this.showOtpBox = true;
        this.message = response.message;
      },
      (error: any) => {
        this.message = 'Registration failed';
      }
    );
  }

  verifyOtp() {
    this.apiService.verifyOtp(this.email, this.otp).subscribe(
      (response: any) => {
        this.message = 'Admin verified!';
      },
      (error: any) => {
        this.message = 'OTP verification failed';
      }
    );
  }
}