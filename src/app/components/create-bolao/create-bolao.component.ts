import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-bolao',
  templateUrl: './create-bolao.component.html',
  styleUrls: ['./create-bolao.component.css']
})
export class CreateBolaoComponent {
  tipoResposta: string = "";

  form: FormGroup;

  constructor (
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      visibilidade: new FormControl('1', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      tipoResposta: new FormControl('', [Validators.required]),
      // logica para placar esportivo ou outro
    })
  }

  onSubmit(){
    if(this.form.invalid){
      alert("Formulário invalido...");
    } else {
      console.log(this.form);
    }
  }

}
