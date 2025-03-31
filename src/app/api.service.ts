import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

<<<<<<< HEAD
=======

>>>>>>> d29f3c82476a56b15527de2716cae33a24af2639
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000'; // Backend URL
<<<<<<< HEAD

=======
  
>>>>>>> d29f3c82476a56b15527de2716cae33a24af2639
  constructor(private http: HttpClient) {}

  // Fetch all ratings
  getRatings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ratings`);
  }
<<<<<<< HEAD

  // Delete a rating
  deleteRating(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/ratings/${id}`);
  }

=======
  
>>>>>>> d29f3c82476a56b15527de2716cae33a24af2639
  // Submit a rating
  submitRating(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ratings`, data);
  }
<<<<<<< HEAD

  // User registration
=======
>>>>>>> d29f3c82476a56b15527de2716cae33a24af2639
  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, { email, password });
  }

<<<<<<< HEAD
  // User OTP verification
  verifyUserOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/verify-otp`, { email, otp });
  }

  // User login
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, { email, password });
  }

  // Admin registration
  registerAdmin(name: string, email: string, password: string) {
    return this.http.post<{ message: string }>(`${this.apiUrl}/admins/register`, { name, email, password });
  }

  // Admin OTP verification
  verifyAdminOtp(email: string, otp: string): Observable<any> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/admins/verify-otp`, { email, otp });
  }

  // Admin login
  adminLogin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/login`, { email, password });
  }
}
=======
  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/verify-otp`, { email, otp }); // ✅ Correct API endpoint
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, { email, password });
  }
}
>>>>>>> d29f3c82476a56b15527de2716cae33a24af2639
