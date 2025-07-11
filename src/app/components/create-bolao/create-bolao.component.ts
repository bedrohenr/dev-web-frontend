import { UsuarioService } from './../../services/usuario.service';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BolaoService } from 'src/app/services/bolao.service';
import { MensageriaService } from './../../core/mensageria/mensageria.service';

@Component({
  selector: 'app-create-bolao',
  templateUrl: './create-bolao.component.html',
  styleUrls: ['./create-bolao.component.css']
})
export class CreateBolaoComponent {
  form: FormGroup;
  isLoading = false;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private bolaoService: BolaoService,
    private mensageriaService: MensageriaService,
    private usuarioService: UsuarioService
  ) {
    this.form = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
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

  addOpcao(): void {
    this.opcoesArray.push(this.createOpcaoControl());
  }

  get opcoesArray(): FormArray {
    return this.form.get('opcoes') as FormArray;
  }

  removeOpcao(index: number): void {
    if (this.opcoesArray.length > 2) {
      this.opcoesArray.removeAt(index);
    } else {
      this.mensageriaService.mensagemErro('É necessário ter pelo menos duas opções!');
    }
  }


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
      this.form.markAllAsTouched();
      return;
    } else {


    this.isLoading = true;

    const dados = {
      nome: this.form.value.titulo,
      descricao: this.form.value.descricao,
      criadorId: this.usuarioService.getIdUsuarioLogado(),
      opcoes: this.form.value.opcoes
    };

     this.bolaoService.criarBolao(dados).subscribe({
      next: (response) => {
        console.log('Bolão criado!', response);
        this.isLoading = false;

        this.mensageriaService.mensagemSucesso(response.message);
      },
        error: (error) => {
          console.error('Erro na tentativa de criação:', error);
          this.isLoading = false;
          const criacaoErro = error.error.message || 'Ocorreu um erro ao criar o bolão. Tente novamente.';

          this.mensageriaService.mensagemErro(criacaoErro);
        }
      });
    }
  }

  hasFieldError(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) {
        return 'Este campo é obrigatório.';
      }
    }
    return '';
  }


  hasOptionsArrayError(): boolean {
    return this.opcoesArray.invalid && (this.opcoesArray.dirty || this.opcoesArray.touched);
  }

  hasOptionError(index: number): boolean {
    const control = this.opcoesArray.at(index);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

}
