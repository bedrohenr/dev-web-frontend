import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateBolaoComponent } from './components/create-bolao/create-bolao.component';
import { UpdateBolaoComponent } from './components/update-bolao/update-bolao.component';
import { OutcomeBolaoComponent } from './components/outcome-bolao/outcome-bolao.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

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
    path:'create',
    component: CreateBolaoComponent,
    // loadChildren: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path:'update/:id',
    component: UpdateBolaoComponent,
    // loadChildren: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path:'outcome/:id',
    component: OutcomeBolaoComponent,
    // loadChildren: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path:'sign-up',
    component: SignUpComponent,
    // loadChildren: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
