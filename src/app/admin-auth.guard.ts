import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('adminToken');

    if (token) {
      return true; // Allow route
    } else {
      this.router.navigate(['/admin-login']);
      return false;
    }
  }
}
