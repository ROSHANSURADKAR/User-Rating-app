import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000'; // Backend URL

  constructor(private http: HttpClient) {}

  // Fetch all ratings
  getRatings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ratings`);
  }

  // Delete a rating
  deleteRating(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/ratings/${id}`);
  }

  // Submit a rating
  submitRating(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ratings`, data);
  }

  // User Registration
  registerUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, { email, password });
  }

  // User OTP verification
  verifyUserOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/verify-otp`, { email, otp });
  }

  // User login
  userLogin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, { email, password });
  }

  // Admin Registration
  registerAdmin(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/admins/register`, { name, email, password });
  }
  

  // Admin OTP Verification
  verifyAdminOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/admins/verify-otp`, { email, otp });
  }
  
  // Admin Login
  adminLogin(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/admin/login`, { email, password });
  }
  
}
