import { NgModule } from '@angular/core';
import { ClientesRoutingModule } from './clientes.routing.module';
import { CoreModule } from '../core/core.module';
import { IncluirClientesComponent } from './Incluir/incluir-clientes.component';
import { ListarClientesComponent } from './Listar/listar-clientes.component';
@NgModule({
    exports: [

    ],
    declarations: [
      IncluirClientesComponent,
      ListarClientesComponent,
    ],
    imports: [
      ClientesRoutingModule,
      CoreModule,
    ]
})
export class ClientesModule { }
