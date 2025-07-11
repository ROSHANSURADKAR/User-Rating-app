import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-address',
  standalone: false,
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
newAddress: string = '';
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

  submit(): void {
    if (!this.newAddress || this.newAddress.trim() === '') {
      this.errorMessage = 'Address is required';
      this.successMessage = '';
      return;
    }

    this.apiService.changeAddress(this.userEmail, this.newAddress).subscribe({
      next: () => {
        this.successMessage = 'Address updated successfully!';
        this.errorMessage = '';
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error updating address.';
        this.successMessage = '';
      }
    });
  }
}
