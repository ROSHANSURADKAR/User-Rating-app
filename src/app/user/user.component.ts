import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  ratings: any[] = [];
  userName: string = ''; // Will be auto-filled from localStorage
  productName:string = '';
  userEmail: string = ''; // Optional: show email in profile
  rating: number | null = null;
  comments: string = '';
  isEditMode: boolean = false;
  editId: number | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    // ✅ Get logged-in user
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userName =user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);      // Pre-fill username
      this.userEmail = user.email;    // Show email if needed
    }

    this.fetchRatings();
  }

  fetchRatings(): void {
    this.apiService.getRatings().subscribe((data) => {
      // ✅ Filter only logged-in user's ratings
      this.ratings = data.filter((r: any) => r.Product_name === this.productName);
    });
  }

  submitRating(): void {
    const ratingData = {
      Product_name: this.productName,
      rating: this.rating,
      comments: this.comments,
       submittedBy: this.userName,
    };

    if (this.isEditMode && this.editId !== null) {
      this.apiService.updateRating(this.editId, ratingData).subscribe(() => {
        this.fetchRatings();
        this.resetForm();
      });
    } else {
      this.apiService.submitRating(ratingData).subscribe(() => {
        this.fetchRatings();
        this.resetForm();
      });
    }
  }

  editRating(rating: any): void {
    this.isEditMode = true;
    this.editId = rating.id;
    this.rating = rating.rating;
    this.comments = rating.comments;
  }

  cancel(): void {
    this.resetForm();
  }

 resetForm(): void {
  this.productName = ''; // ✅ Add this
  this.rating = null;
  this.comments = '';
  this.isEditMode = false;
  this.editId = null;
}
 isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout() {

  this.router.navigate(['/login']); // ✅ Redirect to login
}

}
