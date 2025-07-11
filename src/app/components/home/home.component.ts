import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

  user: string | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.user = this.usuarioService.getNomeUsuarioLogado();
    }
  }

  irParaClientes(){
    this.router.navigate(['/Clientes'])
  }

  irParaFornecedores(){
    this.router.navigate(['/Fornecedores'])
  }
}
