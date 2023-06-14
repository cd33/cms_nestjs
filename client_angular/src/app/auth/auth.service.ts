import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'http://localhost:3000';
  private tokenKey = 'cms_nestjs';
  private token: string | null = null;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.token = localStorage.getItem(this.tokenKey);
  }

  register(credentials: User) {
    const fullURL = `${this.BASE_URL}/users/register`;
    this.httpClient.post<any>(fullURL, credentials).subscribe((createdUser) => {
      console.log('createdUser', createdUser);
    });
  }

  login(credentials: User) {
    const fullURL = `${this.BASE_URL}/auth/login`;
    this.httpClient
      .post<any>(fullURL, credentials)
      .subscribe((serverObject) => {
        this.token = serverObject.access_token;
        localStorage.setItem(this.tokenKey, serverObject.access_token);
        this.router.navigate(['/']);
      });
  }

  logout() {
    this.token = null;
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/']);
  }

  decodePayloadToken(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }

  get isAdmin() {
    if (!this.token) return false;
    const payload = this.decodePayloadToken(this.token);
    if (payload.role === 'admin') {
      return true;
    }
    return false;
  }

  get isConnected() {
    if (!this.token) return false;
    return true;
  }
}
