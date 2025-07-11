// src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importe o HttpClient
import { Observable } from 'rxjs'; // Para trabalhar com observables
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // backend Node.js
  private apiUrl = 'http://localhost:8000/api/user';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { } // Injete o HttpClient

  /**
   * Método para cadastrar um novo usuário.
   * @param userData Os dados do usuário a serem cadastrados.
   * @returns Um Observable com a resposta da API.
   */
  cadastrarUsuario(userData: any): Observable<any> {
    const apiCadastrarEndpoint = '/post-user';
    const url = `${this.apiUrl}${apiCadastrarEndpoint}`;
    return this.http.post<any>(url, userData);
  }


  getIdUsuarioLogado() {
    if(this.authService.isAuthenticated()){
      return localStorage.getItem('user_id');
    } else {
      return null
    }
  }

  getNomeUsuarioLogado(){
    if(this.authService.isAuthenticated()){
      return localStorage.getItem('user_name');
    } else {
      return null;
    }
  }

  getEmailUsuarioLogado() {
    if(this.authService.isAuthenticated()){
      return localStorage.getItem('user_email');
    } else {
      return null;
    }
  }
}
