import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin-dashbord',
  standalone: false,
  templateUrl: './admin-dashbord.component.html',
  styleUrls: ['./admin-dashbord.component.css']
})
export class AdminDashbordComponent implements OnInit {
  users: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('adminToken')) {
      this.router.navigate(['/admin-login']); // Redirect if not logged in
    } else {
      this.loadUsers();
    }
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
      }, error => {
        alert('Error deleting rating.');
      });
    }
  }

  logout() {
    localStorage.removeItem('adminToken'); // Remove stored token
    this.router.navigate(['/admin-login']); // Redirect to login
  }
}
