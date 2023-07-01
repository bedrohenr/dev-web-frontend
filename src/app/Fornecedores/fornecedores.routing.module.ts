import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FornecedoresComponent } from './fornecedores.component';
export const fornecedoresRoutes: Routes = [
  {
    path: '',
    component: FornecedoresComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(fornecedoresRoutes)],
  exports: [RouterModule],
})
export class FornecedoresRoutingModule { }
