import { NgModule } from '@angular/core';
import { FornecedoresRoutingModule } from './fornecedores.routing.module';
import { CoreModule } from '../core/core.module';
import { ListarFornecedoresComponent } from './Listar/listar-fornecedores.component';
import { IncluirFornecedoresComponent } from './Incluir/incluir-fornecedores.component';
@NgModule({
    exports: [

    ],
    declarations: [
      IncluirFornecedoresComponent,
      ListarFornecedoresComponent,
    ],
    imports: [
      FornecedoresRoutingModule,
      CoreModule,
    ]
})
export class FornecedoresModule { }
