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

  ngOnInit(): void {
    this.obterClientes()
  }

  obterClientes(){
    this.clientesService.obterTodosClientes().subscribe({
      next: (clientes: ClientesListarModel[]) => {
        this.clientes = clientes
      }
    })
  }

}
