import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required])
    })
  }

  onSubmit(){
    if(this.form.invalid){
      alert("Formulário invalido...");
    } else {
      console.log(this.form);

      alert("Usuário criado com suceso");
      // Retornar a pagina login após criado
      this.router.navigate(['login'])
    }
  }
}
