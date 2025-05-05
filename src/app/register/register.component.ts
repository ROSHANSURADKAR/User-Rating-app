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
  user: any = {};
  otpSent: boolean = false;
  emailForOtp = '';
  otp = '';


  constructor(private apiService: ApiService, private router: Router) {}
  register() {
    this.apiService. registerUser(this.user).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.otpSent = true;
        this.emailForOtp = this.user.email;
      },
      error: err => alert(err.error.message)
    });
  }

  verifyOtp() {
    this.apiService.verifyUserOtp({ email: this.emailForOtp, otp: this.otp }).subscribe({
      next: (res: any) => alert(res.message),
      error: err => alert(err.error.message)
    });
  }

  goToLogin() {
    this.router.navigate(['/login']); // ✅ Function to navigate to Login page
  }
}
