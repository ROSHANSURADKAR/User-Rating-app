import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  email = '';
  password = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.apiService.adminLogin(this.email, this.password).subscribe(response => {
      if (response.success) {
        localStorage.setItem('adminToken', response.token); // Store token
        this.router.navigate(['/admin-dashboard']); // Redirect to dashboard
      } else {
        alert('Invalid credentials');
      }
    });
  }
}