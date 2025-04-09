import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      return true; // ✅ User is logged in, allow access
    } else {
      alert("You need to login first!");
      this.router.navigate(['/admin-login']); // 🔥 Redirect to Login Page
      return false;
    }
  }
  
}
