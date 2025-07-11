import { UsuarioService } from './../../services/usuario.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user: any = null;
  email: any = null;
  isLogado: boolean = false;

  constructor (
    private usuarioService: UsuarioService
  ){
    if(this.usuarioService.getIdUsuarioLogado() !== null){
      this.user = this.usuarioService.getNomeUsuarioLogado();
      this.email = this.usuarioService.getEmailUsuarioLogado();
    }
  }



}
