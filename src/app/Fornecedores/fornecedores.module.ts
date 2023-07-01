import { NgModule } from '@angular/core';
import { FornecedoresComponent } from './fornecedores.component';
import { FornecedoresRoutingModule } from './fornecedores.routing.module';
@NgModule({
    exports: [

    ],
    declarations: [
      FornecedoresComponent,
    ],
    imports: [
      FornecedoresRoutingModule,
    ]
})
export class FornecedoresModule { }
