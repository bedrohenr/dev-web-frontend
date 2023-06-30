import { NgModule } from '@angular/core';
import { ClientesComponent } from './clientes.component';
import { ClientesRoutingModule } from './clientes.routing.module';
@NgModule({
    exports: [

    ],
    declarations: [
      ClientesComponent,
    ],
    imports: [
      ClientesRoutingModule,
    ]
})
export class ClientesModule { }
