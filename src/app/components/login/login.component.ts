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

  constructor (
    private route: ActivatedRoute,
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
    }
  }

  goSignUp(){
    alert("SING UP");
    this.router.navigate(['/sign-up']);
  }
}
