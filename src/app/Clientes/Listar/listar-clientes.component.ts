import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../clientes.service';
import { Observable } from 'rxjs';
import { ClientesListarModel } from '../clientes.models';


@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
})
export class ListarClientesComponent implements OnInit{

  constructor(
    private clientesService: ClientesService
  ){}

  clientes: ClientesListarModel[] = []
  estaObtendoClientes = false

  ngOnInit(): void {
    this.obterClientes()
  }

  obterClientes(){
    this.estaObtendoClientes = true
    this.clientesService.obterTodosClientes().subscribe({
      next: (clientes: ClientesListarModel[]) => {
        this.clientes = this.clientesService.objetoParaArray(clientes);
        this.estaObtendoClientes = false
      },
      error: () => {
        this.estaObtendoClientes = false
      }
    },)
  }

}
