import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7040/api/Auth'; // Ajusta la URL según tu API

  
  constructor(private http: HttpClient, private router: Router) {
    console.log('AuthService injected');
  }

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // Redirigir al login
  }

  getToken(username: string, password: string): Observable<string> {
    console.log('entro en getToken() de auth.service')
    return this.http.post(`${this.apiUrl}/login`, { username, password }, { responseType: 'text' });
  }

  getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getTokenFromLocalStorage();
  } 
}
