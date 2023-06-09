import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampeonatosModel } from '../components/home/home.models';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class Service {
  constructor(private http: HttpClient) { }
  url = 'https://api.api-futebol.com.br/v1/campeonatos'

  getTimes(): Observable<CampeonatosModel[]> {
    return this.http.get<CampeonatosModel[]>(this.url);
  }
}
