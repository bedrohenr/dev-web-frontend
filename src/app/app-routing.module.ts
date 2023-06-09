import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children:[
      {
        path:'Campeonato/:nomeCampeonato',
        loadChildren: () => import('./campeonato/campeonato.module').then(m => m.CampeonatoModule)
      }
    ]

  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
