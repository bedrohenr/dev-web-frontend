import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientesIncluirModel, ClientesListarModel } from './clientes.models';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ClientesService {
  constructor(private http: HttpClient) { }

  url = 'https://crud-angular-com-firebase-default-rtdb.firebaseio.com/posts.json'

  incluirClientes(cliente: ClientesIncluirModel){
    this.http.post(this.url, cliente).subscribe()
  }

  obterTodosClientes<T>(): Observable<ClientesListarModel[]> {
    return this.http
      .get<ClientesListarModel[]>(this.url);
  }

}
