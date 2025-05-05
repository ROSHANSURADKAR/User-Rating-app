import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000'; // Backend URL

  constructor(private http: HttpClient) {}

  

  // Submit a rating
  submitRating(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ratings`, data);
  }

  // User Registration
  registerUser(data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, data);
  }

  // User OTP verification
  verifyUserOtp(data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/verify-otp`, data);
  }

  // User login
  userLogin(data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, data);
  }
  adminRegister(data: any) {
    return this.http.post(`${this.apiUrl}/admin/register`, data);
  }

  // 🔹 OTP Verification
  verifyOtp(email: string, otp: string) {
    return this.http.post(`${this.apiUrl}/admin/verify-otp`, { email, otp });
  }

  // 🔹 Admin Login
  adminLogin(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/admin/login`, { email, password });
  }

  // 🔹 Get Ratings for Admin Dashboard
  getRatings() {
    return this.http.get<any[]>(`${this.apiUrl}/ratings`);
  }

  // 🔹 Delete a Rating
  deleteRating(id: number) {
    return this.http.delete(`${this.apiUrl}/ratings/${id}`);
  }
}

