import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  otp = '';
  isOtpSent = false;

  constructor(private apiService: ApiService, private router: Router) {}

  register() {
    this.apiService.register(this.email, this.password).subscribe(
      (response) => {
        alert("OTP Sent! Check your email.");
        this.isOtpSent = true;
      },
      (error) => {
        alert(error.error.message || "Registration Failed");
      }
    );
  }

  verifyOtp() {
<<<<<<< HEAD
    this.apiService. verifyUserOtp(this.email, this.otp).subscribe(
=======
    this.apiService.verifyOtp(this.email, this.otp).subscribe(
>>>>>>> d29f3c82476a56b15527de2716cae33a24af2639
      (response) => {
        alert("Registration Successful!");
        this.router.navigate(['/login']);
      },
      (error) => {
        alert("OTP Verification Failed!");
      }
    );
  }
  goToLogin() {
    this.router.navigate(['/login']); // ✅ Function to navigate to Login page
  }
}
