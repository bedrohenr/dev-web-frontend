import { NgModule } from '@angular/core';
import { CampeonatoComponent } from './campeonato.component';
import { CampeonatoRoutingModule } from './campeonato.routing.module';
@NgModule({
    exports: [

    ],
    declarations: [
      CampeonatoComponent,
    ],
    imports: [
      CampeonatoRoutingModule,
    ]
})
export class CampeonatoModule { }
