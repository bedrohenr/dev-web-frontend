import { Directive, HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common'

@Directive({
  selector:'[appHandleBack]'
})

export class HandleBackDirective {
  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ){}

  @HostListener('click') onClick() {
    console.log( 'teste')
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['.'], {relativeTo: this.activatedRoute.parent})
    }
  }
}
