import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientesIncluirModel, ClientesListarModel } from './clientes.models';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ClientesService {
  constructor(private http: HttpClient) { }

  url = 'https://crud-angular-com-firebase-default-rtdb.firebaseio.com/clientes.json'

  incluirClientes(cliente: ClientesIncluirModel){
    this.http.post(this.url, cliente).subscribe()
  }

  obterTodosClientes<T>(): Observable<ClientesListarModel[]> {
    return this.http
      .get<ClientesListarModel[]>(this.url);
  }

  objetoParaArray(objeto: Record<string, any>): ClientesListarModel[] {
    const arrayClientes: ClientesListarModel[] = [];

    for (const chave in objeto) {
      if (objeto.hasOwnProperty(chave)) {
        const cliente = new ClientesListarModel();
        cliente.id = chave;
        cliente.nome = objeto[chave].nome;
        cliente.cpf = objeto[chave].cpf;
        cliente.dataDeNascimento = objeto[chave].dataDeNascimento;
        cliente.cep = parseInt(objeto[chave].cep);
        cliente.estado = objeto[chave].estado;
        cliente.cidade = objeto[chave].cidade;
        cliente.endereco = objeto[chave].endereco;
        cliente.email = objeto[chave].email;
        cliente.ativo = objeto[chave].ativo || '';

        arrayClientes.push(cliente);
      }
    }

    return arrayClientes;
  }

}
