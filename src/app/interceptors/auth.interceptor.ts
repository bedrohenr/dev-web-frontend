// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse // Importe para lidar com erros
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // throwError para propagar erros
import { catchError } from 'rxjs/operators'; // catchError para interceptar erros
import { AuthService } from '../services/auth.service'; // Importe o serviço de autenticação
import { Router } from '@angular/router'; // Para redirecionar em caso de 401

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getToken();

    // Clone a requisição e adicione o cabeçalho Authorization se o token existir
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    // Continue com a requisição e intercepte erros
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Se o erro for 401 (Não Autorizado) e não for a rota de login em si
        if (error.status === 401 && !request.url.includes('/login')) {
          this.authService.logout(); // Limpa o token e redireciona
          // Opcional: this.router.navigate(['/login']); // Já feito no logout, mas pode reforçar aqui
        }
        return throwError(() => error); // Propaga o erro para o componente que fez a requisição
      })
    );
  }
}
