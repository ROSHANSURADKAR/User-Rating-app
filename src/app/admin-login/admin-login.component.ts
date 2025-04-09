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
  email = '';
  password = '';
  loginMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  adminLogin() {
    this.apiService.adminLogin(this.email, this.password).subscribe(
      (response) => {
        alert("Login Successful!");
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/admin-dashbord']);
      },
      (error) => {
      this.loginMessage="Login Failed! Please check your credentials.";
      }
    );
  }
  goToRegister() {
    this.router.navigate(['/admin-register']); 
  }
}
