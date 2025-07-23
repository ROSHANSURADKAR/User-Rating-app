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

  // 🔹 Avatar/Profile Info
  userInitial: string = '?';
  userName: string = '';
  userLastName: string = '';
  userEmail: string = '';
  showDropdown: boolean = false;
  showSettings: boolean = false;

  // 🔹 Rating Form Data
  ratings: any[] = [];
  product_name: string = '';
  rating: number = 0;
  hover: number | null = null;
  category: string = '';
  subcategory: string = '';
  Comment: string = '';
  isEditMode: boolean = false;
  editId: number | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
    this.fetchRatings();
  }

  // ✅ Load user data from localStorage
  loadUserData() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userInitial = user.first_name ? user.first_name.charAt(0).toUpperCase() : '?';
      this.userName = user.first_name || '';
      this.userLastName = user.last_name || '';
      this.userEmail = user.email || '';
    }
  }

  // ✅ Toggle avatar dropdown
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  // ✅ Check login
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // ✅ Logout
  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // ✅ Fetch Ratings
  fetchRatings(): void {
    this.apiService.getRatings().subscribe((data: any[]) => {
      this.ratings = data.filter((r: any) => r.submittedBy === this.userEmail);
    });
  }

  // ✅ Submit / Update Rating
  submitRating(): void {
    if (!this.rating || this.rating < 1 || this.rating > 5) {
      
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

  getStars(rating: number): string[] {
    const fullStars = Math.min(Math.max(rating, 0), 5);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < fullStars ? '★' : '☆');
    }
    return stars;
  }
getStarIcon(star: number): string {
  const currentRating = this.hover ?? this.rating;
  if (currentRating >= star) {
    return '<span style="color: gold;">&#9733;</span>'; // full star
  } else if (currentRating >= star - 0.5) {
    return '<span style="color: gold;">&#189;</span>'; // half-star (approx)
  } else {
    return '<span style="color: gray;">&#9734;</span>'; // empty star
  }
}
  subcategoriesMap: { [key: string]: string[] } = {
    electronics: ['Mobiles', 'Laptops', 'TV', 'Tablets', 'Desktop Computers', 'Wearables (Smart Watches, Fitness Bands)', 'Cameras & Photography', 'Audio Devices (Headphones, Earbuds, Speakers)', 'Home Theater Systems', 'Gaming Consoles'],
    restaurants: ['Italian', 'Chinese', 'Indian', 'Mexican', 'Japanese', 'French', 'Fast Food', 'Fine Dining', 'Cafes'],
    apps: ['Social Media', 'Productivity', 'Games'],
    books: ['Fiction', 'Non-Fiction', 'Comics'],
    movies: ['Action', 'Drama', 'Comedy']
  };
}
