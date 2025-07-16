import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-phonenumber',
  standalone: false,
  templateUrl: './phonenumber.component.html',
  styleUrl: './phonenumber.component.css'
})
export class PhonenumberComponent {
 newPhoneNumber: string = '';
  userEmail: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService) {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userEmail = user.email;
    }
  }

  submit() {
  this.successMessage = '';
  this.errorMessage = '';

  if (!this.newPhoneNumber || !/^\d{10}$/.test(this.newPhoneNumber)) {
    this.errorMessage = 'Please enter a valid 10-digit phone number.';
    return;
  }

    this.apiService.changePhoneNumber(this.userEmail, this.newPhoneNumber).subscribe({
      next: () => {
        this.successMessage = 'Phone number updated successfully!';
        this.errorMessage = '';
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error updating phone number.';
        this.successMessage = '';
      }
    });
  }
}

