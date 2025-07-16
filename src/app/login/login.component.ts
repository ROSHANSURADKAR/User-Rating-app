import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  submitted = false;
  errorMessage = '';
  successMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login(form: any) {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (form.invalid) {
      this.errorMessage = 'Please fix the form errors before submitting.';
      return;
    }

    // Call API
    this.apiService.userLogin(this.credentials).subscribe({
      next: (response: any) => {
        this.successMessage = 'Login successful!';
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(response.user));
        setTimeout(() => this.router.navigate(['/submitrating']), 1000);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Invalid email or password.';
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
