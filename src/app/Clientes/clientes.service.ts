import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientesAlterarModel, ClientesIncluirModel, ClientesListarModel } from './clientes.models';
import { Observable, Subject, tap } from 'rxjs';
import { ClientesEvents } from './clientes.events';

@Injectable({providedIn: 'root'})
export class ClientesService {
  constructor(private http: HttpClient, private clientesEvents: ClientesEvents) { }

  url = 'https://crud-angular-com-firebase-default-rtdb.firebaseio.com/clientes'

  incluirClientes<T>(cliente: ClientesIncluirModel): Observable<any> {
    return this.http.post(`${this.url}.json`, cliente).pipe(tap(() => {
      this.clientesEvents.clienteFoiIncluido.next(Subject<T>);
    }));
  }

  obterTodosClientes<T>(): Observable<ClientesListarModel[]> {
    return this.http
      .get<ClientesListarModel[]>(`${this.url}.json`);
  }

  obterClientePorId<T>(idCliente: string,): Observable<ClientesListarModel> {
    return this.http
      .get<ClientesListarModel>(`${this.url}/${idCliente}.json`);
  }

  alterarCliente<T>(cliente: ClientesAlterarModel) {
    return this.http
      .put(`${this.url}/${cliente.id}.json`, cliente).pipe(tap(() => {
        this.clientesEvents.clienteFoiAlterado.next(Subject<T>);
      }));;
  }

  excluirCliente<T>(idCLiente: string) {
    return this.http
      .delete(`${this.url}/${idCLiente}.json`).pipe(tap(() => {
        this.clientesEvents.clienteFoiExcluido.next(Subject<T>);
      }));;
  }

  objetoParaArray(objeto: Record<string, any>): ClientesListarModel[] { // refatorar, da pra usar o object.keys
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
