import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampeonatoComponent } from './campeonato.component';
export const campeonatoRoutes: Routes = [
  {
    path: '',
    component: CampeonatoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(campeonatoRoutes)],
  exports: [RouterModule],
})
export class CampeonatoRoutingModule { }
