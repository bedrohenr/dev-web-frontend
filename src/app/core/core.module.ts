import { NgModule } from '@angular/core';
import { HandleBackDirective } from './directives/handle-back.directive';
@NgModule({
    exports: [
      HandleBackDirective
    ],
    declarations: [
      HandleBackDirective,
    ],
    imports: [

    ]
})
export class CoreModule { }
