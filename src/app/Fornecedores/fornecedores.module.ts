import { NgModule } from '@angular/core';
import { FornecedoresComponent } from './fornecedores.component';
import { FornecedoresRoutingModule } from './fornecedores.routing.module';
import { CoreModule } from '../core/core.module';
@NgModule({
    exports: [

    ],
    declarations: [
      FornecedoresComponent,
    ],
    imports: [
      FornecedoresRoutingModule,
      CoreModule,
    ]
})
export class FornecedoresModule { }
