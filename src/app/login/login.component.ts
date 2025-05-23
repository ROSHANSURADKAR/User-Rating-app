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
    (response: any) => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(response.user)); // ✅ store user info
      this.router.navigate(['/user']);
    },
    (error) => {
      alert("Login Failed! Please check your Email and password");
    }
  );
}

  goToRegister() {
    this.router.navigate(['/register']); 
  }
}
