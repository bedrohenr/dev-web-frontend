import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarClientesComponent } from './Listar/listar-clientes.component';
import { IncluirClientesComponent } from './Incluir/incluir-clientes.component';
import { AlterarClientesComponent } from './Alterar/alterar-clientes.component';
import { ExcluirClientesComponent } from './Excluir/excluir-clientes.component';
export const clientesRoutes: Routes = [
  {
    path: '',
    component: ListarClientesComponent,
    children: [
      {
        path:'Incluir',
        component: IncluirClientesComponent
      },
      {
        path:'Alterar/:id',
        component: AlterarClientesComponent
      },
      {
        path:'Excluir/:id/:nome',
        component: ExcluirClientesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(clientesRoutes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule { }
