import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-admin-dashbord',
  standalone: false,
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashbordComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  updatedRating: number = 0;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('adminToken')) {
      this.router.navigate(['/admin-login']); // Redirect if not logged in
    }
    this.loadUsers();
  }

  loadUsers() {
    this.apiService.getRatings().subscribe(response => {
      this.users = response;
    }, error => {
      alert('Error fetching users.');
    });
  }

  deleteRating(id: number) {
    if (confirm('Are you sure you want to delete this rating?')) {
      this.apiService.deleteRating(id).subscribe(() => {
        alert('Rating deleted successfully!');
        this.loadUsers();
      });
    }
  }

  selectUser(user: any) {
    this.selectedUser = { ...user };
    this.updatedRating = user.rating;
  }

  updateRating() {
    if (this.selectedUser) {
      const updatedData = { rating: this.updatedRating };
      this.apiService.submitRating(updatedData).subscribe(() => {
        alert('Rating updated successfully!');
        this.selectedUser = null;
        this.loadUsers();
      });
    }
  }

  logout() {
    localStorage.removeItem('adminToken'); // Remove stored token
    this.router.navigate(['/admin-login']); // Redirect to login
  }
}
