import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Rating } from '../model/Rating';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  standalone: false,
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  // Avatar/Profile Info
  userInitial: string = '?';
  userName: string = '';
  userLastName: string = '';
  userEmail: string = '';
  showDropdown: boolean = false;
  showSettings: boolean = false;

  // Ratings List
  ratings: Rating[] = [];

  constructor(private ratingService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadUserData();
    this.fetchRatings();
  }

  // Load User Data for Avatar/Profile
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

  // Avatar Dropdown Toggle
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  // Check Login
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Logout
  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // Fetch Ratings
  fetchRatings() {
    this.ratingService.getRatings().subscribe((data) => {
      this.ratings = data;
    });
  }
}
