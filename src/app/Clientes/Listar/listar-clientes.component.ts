import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientesService } from '../clientes.service';
import { Observable, Subscription } from 'rxjs';
import { ClientesListarModel } from '../clientes.models';
import { ClientesEvents } from '../clientes.events';
import { Location } from '@angular/common';


@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
})
export class ListarClientesComponent implements OnInit, OnDestroy{

  constructor(
    private clientesService: ClientesService,
    private clientesEvents: ClientesEvents,
    private location: Location,
  ){}

  clientes: ClientesListarModel[] = []
  estaObtendoClientes = false
  subscricaoClienteFoiIncluido: Subscription = {} as Subscription;
  subscricaoClienteFoiExcluido: Subscription = {} as Subscription;
  subscricaoClienteFoiAlterado: Subscription = {} as Subscription;

  ngOnInit(): void {
    this.subscricaoClienteFoiIncluido = this.clientesEvents.clienteFoiIncluido.subscribe(
      () => {
        this.obterClientes();
        this.location.back();
      }
    );

    this.subscricaoClienteFoiExcluido = this.clientesEvents.clienteFoiExcluido.subscribe(
      () => {
        this.obterClientes();
        this.location.back();
      }
    );

    this.subscricaoClienteFoiAlterado = this.clientesEvents.clienteFoiAlterado.subscribe(
      () => {
        this.obterClientes();
        this.location.back();
      }
    );

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

  ngOnDestroy(): void {
    if (this.subscricaoClienteFoiIncluido && this.subscricaoClienteFoiIncluido?.unsubscribe) {
      this.subscricaoClienteFoiIncluido.unsubscribe();
    }
    if (this.subscricaoClienteFoiExcluido && this.subscricaoClienteFoiExcluido?.unsubscribe) {
      this.subscricaoClienteFoiExcluido.unsubscribe();
    }
    if (this.subscricaoClienteFoiAlterado && this.subscricaoClienteFoiAlterado?.unsubscribe) {
      this.subscricaoClienteFoiAlterado.unsubscribe();
    }
  }

}
