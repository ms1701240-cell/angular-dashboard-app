import { Injectable,inject } from '@angular/core';
import { LoginRequest } from '../Models/LoginRequest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../Models/LoginResponse';
import { Router } from '@angular/router';
import { PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private http=inject(HttpClient);
  private router=inject(Router);
  private platformId=inject(PLATFORM_ID);
  login(request: LoginRequest):Observable<LoginResponse> {
    return this.http.post<LoginResponse>('https://dummyjson.com/auth/login', request);
  }
  savedToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }
  getToken(): string | null {
    if(isPlatformBrowser(this.platformId)){
      return localStorage.getItem('token');
    }
    return null;
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  logout() {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
  getUserInfo(): Observable<LoginResponse> {
    return this.http.get<LoginResponse>('https://dummyjson.com/auth/me');
  }

}
