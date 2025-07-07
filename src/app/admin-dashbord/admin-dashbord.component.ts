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
  adminName: string = '';
  adminEmail: string = '';
  showSettings: boolean = false;

  users: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('adminToken')) {
      this.router.navigate(['/admin-login']);
    } else {
      const adminData = localStorage.getItem('admin');
      if (adminData) {
        const admin = JSON.parse(adminData);
        this.adminName = admin.first_name.charAt(0).toUpperCase() + admin.first_name.slice(1);
        this.adminEmail = admin.email || '';
      }

      this.loadUsers();
    }
  }

  changeAdminname(): void {
    const newAdminname = prompt('Enter new username:');
    if (newAdminname && newAdminname.trim() !== '') {
      this.adminName = newAdminname.charAt(0).toUpperCase() + newAdminname.slice(1);

      const adminData = localStorage.getItem('admin');
      if (adminData) {
        const admin = JSON.parse(adminData);
        admin.first_name = newAdminname;
        localStorage.setItem('admin', JSON.stringify(admin));
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

  loadUsers() {
    this.apiService.getRatings().subscribe(
      response => {
        this.users = response;
      },
      error => {
        alert('Error fetching users.');
      }
    );
  }

  deleteRating(id: number) {
    if (confirm('Are you sure you want to delete this rating?')) {
      this.apiService.deleteRating(id).subscribe(
        () => {
          alert('Rating deleted successfully!');
          this.loadUsers();
        },
        error => {
          alert('Error deleting rating.');
        }
      );
    }
  }

  logout() {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/admin-login']);
  }
}
