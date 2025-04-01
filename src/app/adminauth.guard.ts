import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if the admin token is available in localStorage
    const adminToken = localStorage.getItem('adminToken');
    
    // If token exists, allow access to the route
    if (adminToken) {
      return true;
    }

    // If no token, redirect to the admin login page
    this.router.navigate(['/admin-login']);
    return false;
  }
}
