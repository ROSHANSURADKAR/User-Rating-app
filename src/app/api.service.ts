import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000'; // Backend URL
  

  constructor(private http: HttpClient) {}

  

  

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

  submitRating(data: any) {
    return this.http.post(`${this.apiUrl}/ratings`, data);
  }

  updateRating(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/ratings/${id}`, data);
  }

  deleteRating(id: number) {
    return this.http.delete(`${this.apiUrl}/ratings/${id}`);
  }
   changePassword(email: string, currentPassword: string, newPassword: string) {
  return this.http.post(`${this.apiUrl}/users/password`, {
    email,
    currentPassword,
    newPassword
  });
}
requestPasswordReset(email: string) {
  return this.http.post(`${this.apiUrl}/users/forgot-password`, { email });
}
changePhoneNumber(email: string, newPhoneNumber: string) {
  return this.http.post(`${this.apiUrl}/users/phonenumber`, {
    email,
    newPhoneNumber
  });
}
changeAddress(email: string, newAddress: string) {
  return this.http.post(`${this.apiUrl}/users/address`, {
    email,
    newAddress
  });
}

updateUsername(email: string, first_name: string, last_name: string) {
  return this.http.put(`${this.apiUrl}/users/username`, {
    email,
    first_name,
    last_name
  });
}




}


