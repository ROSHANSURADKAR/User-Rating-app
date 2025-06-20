import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submitrating',
  standalone: false,
  templateUrl: './submitrating.component.html',
  styleUrls: ['./submitrating.component.css']
})
export class SubmitratingComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  showSettings: boolean = false;

  allRatings: any[] = [];
  filteredRatings: any[] = [];
  searchQuery: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userName =user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);
      this.userEmail = user.email || '';
    }

    this.fetchAllRatings(); // 👈 Correctly moved here
  }

  changeUsername(): void {
    const newUsername = prompt('Enter new username:');
    if (newUsername && newUsername.trim() !== '') {
      this.userName = newUsername.charAt(0).toUpperCase() + newUsername.slice(1);

      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        user.first_name = newUsername;
        localStorage.setItem('user', JSON.stringify(user));
      }

      alert('Username updated successfully!');
    }
  }

  changePassword(): void {
    const newPassword = prompt('Enter new password:');
    if (newPassword && newPassword.trim() !== '') {
      alert('Password change requested. Implement API call here.');
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  fetchAllRatings(): void {
    this.apiService.getRatings().subscribe((data: any[]) => {
      this.allRatings = data;
      this.filteredRatings = data;
    });
  }

  searchRatings(): void {
    const query = this.searchQuery.trim().toLowerCase();
    if (query === '') {
      this.filteredRatings = this.allRatings;
    } else {
      this.filteredRatings = this.allRatings.filter((rating: any) =>
        rating.Product_name.toLowerCase().includes(query) ||
        rating.submittedBy.toLowerCase().includes(query) ||
        (rating.comment && rating.comment.toLowerCase().includes(query))
      );
    }
  }
  deleteRating(id: number): void {
  if (confirm('Are you sure you want to delete this rating?')) {
    this.apiService.deleteRating(id).subscribe(() => {
      this.fetchAllRatings(); // refresh after delete
    });
  }
}

}
