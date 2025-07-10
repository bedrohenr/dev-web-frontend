import { UsuarioService } from './../../services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  loginSucesso: boolean = false; // Para feedback ao usuário
  loginErro: string | null = null; // Para feedback de erro


  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required])
    })
  }

  onSubmit(){
    if(this.form.invalid){
      alert("Formulário invalido...");
    } else {
       const dadosUsuario = {
        email: this.form.value.email,
        senha: this.form.value.senha
      };

       this.usuarioService.autenticacao(dadosUsuario).subscribe({
        next: (response) => {
          console.log('Usuário logado!', response);
          this.loginSucesso = true;

          // Retornar a pagina login após criado
          alert(response.message);
          // this.router.navigate(['login'])
        },
        error: (error) => {
          console.error('Erro na tentativa de login:', error);
          this.loginErro = error.error.message || 'Ocorreu um erro no login. Tente novamente.';

          alert(this.loginErro);
        }
      });
    }
  }
}
