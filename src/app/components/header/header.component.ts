import { UsuarioService } from './../../services/usuario.service';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ){
    if(this.usuarioService.getIdUsuarioLogado() !== null){
      this.user = this.usuarioService.getNomeUsuarioLogado();
      this.email = this.usuarioService.getEmailUsuarioLogado();
    }
  }

  logout() {
    // Usar o método logout do AuthService que já limpa o localStorage e redireciona
    this.authService.logout();
    this.user = null;
    this.email = null;
    this.isLogado = false;
  }

}
