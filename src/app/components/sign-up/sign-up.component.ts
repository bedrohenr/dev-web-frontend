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

  constructor (
    private router: Router
  ) {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      data_nascimento: new FormControl('', [Validators.required]),
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

      alert("Usuário criado com suceso");
      // Retornar a pagina login após criado
      // this.router.navigate(['login'])
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
