import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BolaoService {
  private apiUrl = 'http://localhost:8000/api/grupo';

  constructor(private http: HttpClient) { } // Injete o HttpClient

  criarBolao(userData: any): Observable<any> {
    const apiCriarEndpoint = '/post-grupo';
    const url = `${this.apiUrl}${apiCriarEndpoint}`;
    return this.http.post<any>(url, userData);
  }

  getAllGrupo(): Observable<any> {
    const apiGetAllEndpoint = '/get-all-grupo';
    const url = `${this.apiUrl}${apiGetAllEndpoint}`;
    return this.http.get<any>(url);
  }

  obterBolao(id: number): Observable<any> {
    const apiObterEndpoint = `/get-one-grupo/${id}`;
    const url = `${this.apiUrl}${apiObterEndpoint}`;
    return this.http.get<any>(url);
  }

  atualizarBolao(id: number, userData: any): Observable<any> {
    const apiAtualizarEndpoint = `/patch-grupo/${id}`;
    const url = `${this.apiUrl}${apiAtualizarEndpoint}`;
    return this.http.patch<any>(url, userData);
  }

  excluirBolao(id: number): Observable<any> {
    const apiExcluirEndpoint = `/delete-grupo/${id}`;
    const url = `${this.apiUrl}${apiExcluirEndpoint}`;
    return this.http.delete<any>(url);
  }

  getBolaoById(id: number): Observable<any>{
    const apiGetBolaoEndpoint = `/get-one-grupo`;
    const url = `${this.apiUrl}${apiGetBolaoEndpoint}/${id}`;
    return this.http.get<any>(url);
  }
}
