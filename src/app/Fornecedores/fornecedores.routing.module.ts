import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarFornecedoresComponent } from './Listar/listar-fornecedores.component';
import { IncluirFornecedoresComponent } from './Incluir/incluir-fornecedores.component';
export const fornecedoresRoutes: Routes = [
  {
    path: '',
    component: ListarFornecedoresComponent,
    children: [
      {
        path: 'Incluir',
        component: IncluirFornecedoresComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(fornecedoresRoutes)],
  exports: [RouterModule],
})
export class FornecedoresRoutingModule { }
