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
  
  // Submit a rating
  submitRating(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ratings`, data);
  }
  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, { email, password });
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/verify-otp`, { email, otp }); // ✅ Correct API endpoint
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, { email, password });
  }
}