import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {constructor(private router: Router) {}

isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

logout() {
  localStorage.removeItem('isLoggedIn');
  alert('Logged out successfully!');
  this.router.navigate(['/login']); // 🔥 Redirect to Login Page
}
<<<<<<< HEAD
}0
=======
}
>>>>>>> d29f3c82476a56b15527de2716cae33a24af2639
