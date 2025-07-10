import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BolaoService } from 'src/app/services/bolao.service';

@Component({
  selector: 'app-create-bolao',
  templateUrl: './create-bolao.component.html',
  styleUrls: ['./create-bolao.component.css']
})
export class CreateBolaoComponent {
  form: FormGroup;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private bolaoService: BolaoService
  ) {
    this.form = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      visibilidade: new FormControl('1', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      opcoes: new FormArray([
        new FormControl('', [Validators.required]),
        new FormControl('', [Validators.required])
      ], this.minOptionsValidator(2) )
    });
  }

  createOpcaoControl(): FormControl {
    return new FormControl('', [Validators.required]);
  }

  // Método para adicionar uma nova opção ao FormArray
  addOpcao(): void {
    this.opcoesArray.push(this.createOpcaoControl());
  }

  get opcoesArray(): FormArray {
    // É importante fazer o 'as FormArray' para que o TypeScript saiba o tipo correto
    return this.form.get('opcoes') as FormArray;
  }

  removeOpcao(index: number): void {
    if (this.opcoesArray.length > 2) { // Garante que pelo menos uma opção permaneça
      this.opcoesArray.removeAt(index);
    } else {
      alert('É necessário ter pelo menos duas opções!');
    }
  }

  // Quantidade minima de opcoes
  minOptionsValidator(min: number): ValidatorFn {
    return (formArray: AbstractControl): { [key: string]: any } | null => {
      if (formArray instanceof FormArray && formArray.controls.length < min) {
        return { 'minOptions': { required: min, actual: formArray.controls.length } };
      }
      return null;
    };
  }

  onSubmit(){
    if(this.form.invalid){
      alert("Formulário invalido...");
      console.log(this.form);
    } else {
      const dados = {
        nome: this.form.value.titulo,
        descricao: this.form.value.descricao,
        criadorId: 1, // Não tem autenticação ainda
        opcoes: this.form.value.opcoes
      };

       this.bolaoService.criarBolao(dados).subscribe({
        next: (response) => {
          console.log('Bolão criado!', response);

          // Retornar a pagina login após criado
          alert(response.message);
          // this.router.navigate(['login'])
        },
          error: (error) => {
            console.error('Erro na tentativa de login:', error);
            const criacaoErro = error.error.message || 'Ocorreu um erro no login. Tente novamente.';

            alert(criacaoErro);
          }
        });
    }
  }

}
