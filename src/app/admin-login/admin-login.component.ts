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

  constructor(private adminService: ApiService, private router: Router) {}

  login() {
    this.adminService.login(this.email, this.password).subscribe(response => {
      alert(response.message);
      localStorage.setItem('adminToken', response.token);
      this.router.navigate(['/admin-dashboard']);
    });
  }
}