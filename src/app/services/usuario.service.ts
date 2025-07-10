// src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importe o HttpClient
import { Observable } from 'rxjs'; // Para trabalhar com observables

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // backend Node.js
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { } // Injete o HttpClient

  /**
   * Método para cadastrar um novo usuário.
   * @param userData Os dados do usuário a serem cadastrados.
   * @returns Um Observable com a resposta da API.
   */
  cadastrarUsuario(userData: any): Observable<any> {
    const apiCadastrarEndpoint = '/user/post-user';
    const url = `${this.apiUrl}${apiCadastrarEndpoint}`;
    return this.http.post<any>(url, userData);
  }

  autenticacao(userData: any): Observable<any> {
    const apiLogin = '/user/login';
    const url = `${this.apiUrl}${apiLogin}`;
    return this.http.post<any>(url, userData);
  }

}
