import { NgModule } from '@angular/core';
import { ClientesRoutingModule } from './clientes.routing.module';
import { CoreModule } from '../core/core.module';
import { IncluirClientesComponent } from './Incluir/incluir-clientes.component';
import { ListarClientesComponent } from './Listar/listar-clientes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
    exports: [

    ],
    declarations: [
      IncluirClientesComponent,
      ListarClientesComponent,
    ],
    imports: [
      CommonModule,
      ClientesRoutingModule,
      CoreModule,
      ReactiveFormsModule,
    ]
})
export class ClientesModule { }
