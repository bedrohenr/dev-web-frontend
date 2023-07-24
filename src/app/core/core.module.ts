import { NgModule } from '@angular/core';
import { HandleBackDirective } from './directives/handle-back.directive';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
    exports: [
      HandleBackDirective
    ],
    declarations: [
      HandleBackDirective,
    ],
    imports: [
      ToastrModule.forRoot(),
    ]
})
export class CoreModule { }
