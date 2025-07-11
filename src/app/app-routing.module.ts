import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateBolaoComponent } from './components/create-bolao/create-bolao.component';
import { UpdateBolaoComponent } from './components/update-bolao/update-bolao.component';
import { OutcomeBolaoComponent } from './components/outcome-bolao/outcome-bolao.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ListBolaoComponent } from './components/list-bolao/list-bolao.component';
import { AuthGuard } from './guards/auth.guard';

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
    path:'sign-up',
    component: SignUpComponent,
    // loadChildren: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path:'boloes',
    component: ListBolaoComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'create',
    component: CreateBolaoComponent,
    canActivate: [AuthGuard]
    // loadChildren: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path:'update/:id',
    component: UpdateBolaoComponent,
    canActivate: [AuthGuard]
    // loadChildren: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path:'outcome/:id',
    component: OutcomeBolaoComponent,
    canActivate: [AuthGuard]
    // loadChildren: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
