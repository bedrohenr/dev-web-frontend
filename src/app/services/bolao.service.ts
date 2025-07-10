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
}
