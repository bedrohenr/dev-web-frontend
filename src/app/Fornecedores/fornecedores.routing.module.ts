import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarFornecedoresComponent } from './Listar/listar-fornecedores.component';
export const fornecedoresRoutes: Routes = [
  {
    path: '',
    component: ListarFornecedoresComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(fornecedoresRoutes)],
  exports: [RouterModule],
})
export class FornecedoresRoutingModule { }
