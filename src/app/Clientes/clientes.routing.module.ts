import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes.component';
export const clientesRoutes: Routes = [
  {
    path: '',
    component: ClientesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(clientesRoutes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule { }
