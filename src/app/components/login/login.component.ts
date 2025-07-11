import { AuthInterceptor } from './../../core/handlers/http.handle-interceptor';
import { AuthService } from './../../services/auth.service';
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
    private usuarioService: UsuarioService,
    private authService: AuthService
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
       const dados = {
        email: this.form.value.email,
        senha: this.form.value.senha
      };

       this.authService.login(dados).subscribe({
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
          this.form.markAllAsTouched();
        }
      });
    }
  }
}
