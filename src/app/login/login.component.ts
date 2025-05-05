import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.apiService.userLogin(this.credentials).subscribe(
      (response) => {
        alert("Login Successful!");
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/user']);
      },
      (error) => {
        alert("Login Failed! Please check your credentials.");
      }
    );
  }
  goToRegister() {
    this.router.navigate(['/register']); // 🔥 Button to switch to Register Page
  }
}
