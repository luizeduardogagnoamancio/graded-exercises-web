import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

export interface UserData {
  email: string;
}
interface DecodedToken {
  sub: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserData | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    this.loadInitialUser();
  }

  private loadInitialUser(): void {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          this.currentUserSubject.next({ email: decodedToken.sub });
        } else {
          this.logout();
        }
      } catch (error) {
        console.error("Erro ao decodificar token inicial:", error);
        this.logout();
      }
    }
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  login(token: string): void {
    localStorage.setItem('authToken', token);
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      this.currentUserSubject.next({ email: decodedToken.sub });
    } catch (error) {
      console.error("Erro ao decodificar token no login:", error);
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public get currentUserValue(): UserData | null {
    return this.currentUserSubject.value;
  }
}
