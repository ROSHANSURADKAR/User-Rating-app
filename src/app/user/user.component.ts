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
  product_name: string = '';
  rating: number | null = null;
  comments: string = '';

  userName: string = '';
  userEmail: string = '';

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
    this.apiService.getRatings().subscribe((data: any[]) => {
      // Filter ratings by user email (or name) if needed
      this.ratings = data.filter((r: any) => r.submittedBy === this.userEmail); // or use userName if required
    });
  }
 
  

    submitRating(): void {
    const ratingData = {
      Product_name: this.product_name,
      rating: this.rating,
      comments: this.comments,
      submittedBy: this.userEmail // or use userName
    };
console.log('log submit');
   
if (this.isEditMode && this.editId !== null) {
      // Update existing rating
      this.apiService.updateRating(this.editId, ratingData).subscribe(() => {
        this.fetchRatings();
        this.resetForm();
      });
    } else {
      // Submit new rating
      this.apiService.submitRating(ratingData).subscribe(() => {
        this.fetchRatings();
        this.resetForm();
      });
    }
  }
 
  editRating(rating: any): void {
    this.isEditMode = true;
    this.editId = rating.id;
    this.product_name = rating.Product_name;
    this.rating = rating.rating;
    this.comments = rating.comments;
  }
  cancel(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.product_name = '';
    this.rating = null;
    this.comments = '';
    this.isEditMode = false;
    this.editId = null;
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
