// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs'; // Importe BehaviorSubject e tap
import { Router } from '@angular/router'; // Para redirecionamento

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Sua URL base da API
  // BehaviorSubject para gerenciar o estado de login (true/false)
  private _isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());

  // Observable público para que outros componentes possam se inscrever no estado de login
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // Verifica se há um token no localStorage ao iniciar o serviço
  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  login(credentials: { email: string; senha: string }): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/user/login`,
      credentials
    ).pipe(
      tap((response: any) => {
        // Supondo que o backend retorna o token em 'access_token'
        if (response.user.token) {
          localStorage.setItem('access_token', response.user.token);
          // Opcional: armazenar dados do usuário também
          localStorage.setItem('user_data', JSON.stringify(response.user.user));
          localStorage.setItem('user_id', response.user.id);
          localStorage.setItem('user_name', response.user.nome);
          localStorage.setItem('user_email', response.user.email);
          this._isLoggedIn.next(true); // Atualiza o estado de login
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    this._isLoggedIn.next(false); // Atualiza o estado de login
    this.router.navigate(['/login']); // Redireciona para a tela de login
  }

  // Método para obter o token (usado pelo interceptor)
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Método para obter dados do usuário (opcional)
  getUserData(): any | null {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
