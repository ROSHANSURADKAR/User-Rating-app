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
  rating: number = 0;
  hover: number | null = null;
  category: string = '';
  subcategory: string = '';
  Comment: string = '';

  userName: string = '';
  userEmail: string = '';

  isEditMode: boolean = false;
  editId: number | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userName = user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);
      this.userEmail = user.email;
    }
    this.fetchRatings();
  }

  fetchRatings(): void {
    this.apiService.getRatings().subscribe((data: any[]) => {
      this.ratings = data.filter((r: any) => r.submittedBy === this.userEmail);
    });
  }

  submitRating(): void {
    if (!this.rating || this.rating < 1 || this.rating > 5) {
      alert('Rating must be between 1 and 5.');
      return;
    }

    const ratingData = {
      Product_name: this.product_name,
      rating: Number(this.rating),
      category: this.category,
      subcategory: this.subcategory,
      Comment: this.Comment,
      submittedBy: this.userEmail
    };

    console.log('Submitting rating:', ratingData);

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
    this.editId = rating.Id;
    this.product_name = rating.Product_name;
    this.rating = rating.rating;
    this.category = rating.category;
    this.subcategory = rating.subcategory;
    this.Comment = rating.Comment;
  }
  cancel(): void {
    this.resetForm();
  }
  resetForm(): void {
    this.product_name = '';
    this.rating = 0;
    this.category = '';
    this.subcategory = '';
    this.Comment = '';
    this.isEditMode = false;
    this.editId = null;
  }

  setRating(value: number) {
    this.rating = value;
  }

  setHover(value: number | null) {
    this.hover = value;
  }

  subcategoriesMap: { [key: string]: string[] } = {
    electronics: ['Mobiles', 'Laptops', 'TV', 'Tablets', 'Desktop Computers', 'Wearables (Smart Watches, Fitness Bands)', 'Cameras & Photography', 'Audio Devices (Headphones, Earbuds, Speakers)', 'Home Theater Systems', 'Gaming Consoles'],
    restaurants: ['Italian', 'Chinese', 'Indian', 'Mexican', 'Japanese', 'French', 'Fast Food', 'Fine Dining', 'Cafes'],
    apps: ['Social Media', 'Productivity', 'Games'],
    books: ['Fiction', 'Non-Fiction', 'Comics'],
    movies: ['Action', 'Drama', 'Comedy']
  };

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
