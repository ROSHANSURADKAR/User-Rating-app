import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin-register',
  standalone: false,
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.css'
})
export class AdminRegisterComponent {

  name = '';
  email = '';
  password = '';
  otp = '';
  showOtpInput = false;
  isOtpSent = false;

  constructor(private adminService: ApiService) {}

  register() {
    this.adminService.registerAdmin(this.name, this.email, this.password).subscribe(response => {
      alert(response.message);
      this.showOtpInput = true;
      this.isOtpSent = true; // Set to true when OTP is sent
    });
  }

  verifyOtp() {
    this.adminService.verifyAdminOtp(this.email, this.otp).subscribe(response => {
      alert(response.message);
    });
  }
}
