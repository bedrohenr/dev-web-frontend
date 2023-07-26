import { NgModule } from '@angular/core';
import { ClientesRoutingModule } from './clientes.routing.module';
import { CoreModule } from '../core/core.module';
import { IncluirClientesComponent } from './Incluir/incluir-clientes.component';
import { ListarClientesComponent } from './Listar/listar-clientes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlterarClientesComponent } from './Alterar/alterar-clientes.component';
import { ExcluirClientesComponent } from './Excluir/excluir-clientes.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
@NgModule({
    exports: [

    ],
    declarations: [
      IncluirClientesComponent,
      ListarClientesComponent,
      AlterarClientesComponent,
      ExcluirClientesComponent
    ],
    imports: [
      CommonModule,
      ClientesRoutingModule,
      CoreModule,
      ReactiveFormsModule,
      NgxMaskModule.forRoot(),

    ]
})
export class ClientesModule { }
