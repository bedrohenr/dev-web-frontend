import { NgModule } from '@angular/core';
import { ClientesComponent } from './clientes.component';
import { ClientesRoutingModule } from './clientes.routing.module';
import { CoreModule } from '../core/core.module';
@NgModule({
    exports: [

    ],
    declarations: [
      ClientesComponent,
    ],
    imports: [
      ClientesRoutingModule,
      CoreModule,
    ]
})
export class ClientesModule { }
