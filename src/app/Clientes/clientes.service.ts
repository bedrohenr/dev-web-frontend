import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientesIncluirModel } from './clientes.models';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ClientesService {
  constructor(private http: HttpClient) { }

  url = 'https://crud-angular-com-firebase-default-rtdb.firebaseio.com/posts.json'

  incluirClientes(cliente: ClientesIncluirModel){
    this.http.post(this.url, cliente).subscribe()
  }

}
