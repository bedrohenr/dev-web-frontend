import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateBolaoComponent } from './components/create-bolao/create-bolao.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path:'login',
    component: LoginComponent,
    // loadChildren: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path:'criar',
    component: CreateBolaoComponent,
    // loadChildren: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  // {
  //   path:'Fornecedores',
  //   loadChildren: () => import('./Fornecedores/fornecedores.module').then(m => m.FornecedoresModule)
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
