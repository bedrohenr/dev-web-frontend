import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FornecedoresIncluirModel } from '../fornecedores.models';


@Component({
  selector: 'app-incluir-fornecedores',
  templateUrl: './incluir-fornecedores.component.html',
})
export class IncluirFornecedoresComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ){}

  estaEnviandoFormulario = false

  formIncluirFornecedor = this.formBuilder.group({
    nomeFantasia: new FormControl<string | null>(null, Validators.required),
    razaoSocial: new FormControl<string | null>(null, Validators.required),
    ramoDeAtividade: new FormControl<string | null>(null, Validators.required),
    pessoa: new FormControl<string | null>(null),
    cnpj: new FormControl<number | null>(null, Validators.required),
    cep: new FormControl<number | null>(null, Validators.required),
    estado: new FormControl<string | null>(null, Validators.required),
    cidade: new FormControl<string | null>(null, Validators.required),
    endereco: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, Validators.required),
    ativo: new FormControl<string | null>(null),
  })

  ngOnInit(): void {

  }

  salvarFornecedor(){
    if(this.formIncluirFornecedor.valid){
      const fornecedor = new FornecedoresIncluirModel({
        nomeFantasia: this.formIncluirFornecedor.value.nomeFantasia,
        razaoSocial: this.formIncluirFornecedor.value.razaoSocial,
        ramoDeAtividade: this.formIncluirFornecedor.value.ramoDeAtividade,
        pessoa: this.formIncluirFornecedor.value.pessoa,
        cnpj: this.formIncluirFornecedor.value.cnpj,
        cep: this.formIncluirFornecedor.value.cep,
        estado: this.formIncluirFornecedor.value.estado,
        endereco: this.formIncluirFornecedor.value.endereco,
        cidade: this.formIncluirFornecedor.value.cidade,
        email: this.formIncluirFornecedor.value.email,
        ativo: this.formIncluirFornecedor.value.ativo,
      })

      this.estaEnviandoFormulario = true
      console.log(fornecedor)
      this.router.navigate(['Fornecedores'])
    }

  }
}
