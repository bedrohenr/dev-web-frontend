import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarClientesComponent } from './Listar/listar-clientes.component';
export const clientesRoutes: Routes = [
  {
    path: '',
    component: ListarClientesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(clientesRoutes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule { }
