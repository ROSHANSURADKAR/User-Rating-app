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
  first_name = '';
  last_name = '';
  email = '';
  phone_number = '';
  address= '';
  password = '';
  confirm_password = '';
  otp = '';
  showOtpBox = false;
  message = '';
  constructor(private apiService: ApiService, private router: Router) {}

  registerAdmin() {
    const adminData = {  
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password,
      phone_number: this.phone_number,
      address:this.address
     };
   
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
this.apiService.verifyOtp(this.email,this.otp).subscribe(
(response: any) => {
        
        this.router.navigate(['/admin-login']);
      },
      (error) => {
        alert("OTP Verification Failed!");
      }
    );
  }
   goToadminRegister() {
    this.router.navigate(['/admin-login']); 
  }
}