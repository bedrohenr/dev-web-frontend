import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path:'Clientes',
    loadChildren: () => import('./Clientes/clientes.module').then(m => m.ClientesModule)
  },
  {
    path:'Fornecedores',
    loadChildren: () => import('./Fornecedores/fornecedores.module').then(m => m.FornecedoresModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
