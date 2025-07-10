import { UsuarioService } from './../../services/usuario.service';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  form: FormGroup;
  cadastroSucesso: boolean = false; // Para feedback ao usuário
  cadastroErro: string | null = null; // Para feedback de erro

  constructor (
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required]),
      senha2: new FormControl('', Validators.required)
    }, { validators: this.passwordMatch })
  }

  onSubmit(){
    if(this.form.invalid){
      alert("Formulário invalido...");
      console.log(this.form);
    } else {
      console.log("Form válido");
      console.log(this.form);

      const dadosUsuario = {
        nome: this.form.value.nome,
        cpf: this.form.value.cpf,
        dataNascimento: this.form.value.dataNascimento,
        email: this.form.value.email,
        senha: this.form.value.senha,
        status: 1
      };

       this.usuarioService.cadastrarUsuario(dadosUsuario).subscribe({
        next: (response) => {
          console.log('Usuário cadastrado com sucesso!', response);
          this.cadastroSucesso = true;
          this.form.reset(); // Opcional: Limpar o formulário após o sucesso

          // Retornar a pagina login após criado
          alert(response.message);
          this.router.navigate(['login'])
        },
        error: (error) => {
          console.error('Erro ao cadastrar usuário:', error);
          if (error.status === 409) { // Conflito, ex: CPF/Email duplicado
            this.cadastroErro = error.error.message || 'CPF ou Email já cadastrado.';
          } else {
            this.cadastroErro = 'Ocorreu um erro ao cadastrar. Tente novamente.';
          }
          alert(this.cadastroErro);
        }
      });

    }
  }

  passwordMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    console.log("password match");
    const password = control.get('senha');
    const confirmPassword = control.get('senha2');

    if (!password || !confirmPassword) {
      return null;
    }

    // Se os valores não forem iguais e a confirmação de senha tiver sido tocada
    if (password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  };
}
