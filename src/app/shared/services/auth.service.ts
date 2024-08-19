import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly AUTH_TOKEN_KEY = 'AUTH_TOKEN';

  login(email: string, password: string): Observable<{token: string}> {
    return this.http.post<{token: string}>(`/api/auth/token/login/`, { email, password })
      .pipe(tap(({token}: {token: string}) => localStorage.setItem(this.AUTH_TOKEN_KEY, token)));
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.AUTH_TOKEN_KEY);

    console.log(token);

    return token ?? null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
  logout(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}
