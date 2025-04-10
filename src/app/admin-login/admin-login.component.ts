import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
 
@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';
  loginMessage: string = '';
 
  constructor(private apiService: ApiService, private router: Router) {}
 
  adminLogin() {
    // Validate the input before making the API call
    if (!this.email || !this.password) {
      this.loginMessage = 'Please enter both email and password.';
      return;
    }
 
    // Call the API to authenticate the admin
    this.apiService.adminLogin(this.email, this.password).subscribe(
      (response: any) => {
        // Assuming the response contains a token when login is successful
        if (response.token) {
          localStorage.setItem('adminToken', response.token);  // Store the token in localStorage
          this.router.navigate(['/admin-dashboard']);  // Redirect to the admin dashboard
        } else {
          this.loginMessage = 'Invalid credentials. Please try again.';
        }
      },
      (error) => {
        this.loginMessage = 'Login failed. Please try again.';
        console.error('Error during login:', error);
      }
    );
  }
}