import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClientesIncluirModel } from '../clientes.models';


@Component({
  selector: 'app-incluir-clientes',
  templateUrl: './incluir-clientes.component.html',
})
export class IncluirClientesComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder
  ){}

  estaEnviandoFormulario = false

  formIncluirCliente = this.formBuilder.group({
    nome: new FormControl<string | null>(null, Validators.required),
    cpf: new FormControl<number | null>(null, Validators.required),
    dataDeNascimento: new FormControl<number | null>(null, Validators.required),
    cep: new FormControl<number | null>(null, Validators.required),
    estado: new FormControl<string | null>(null, Validators.required),
    cidade: new FormControl<string | null>(null, Validators.required),
    endereco: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, Validators.required),
    ativo: new FormControl<string | null>(null, Validators.required),
  })

  ngOnInit(): void {

  }

  salvarClientes(){

    const cliente = new ClientesIncluirModel({
      nome: this.formIncluirCliente.value.nome,
      cpf: this.formIncluirCliente.value.cpf,
      dataDeNascimento: this.formIncluirCliente.value.dataDeNascimento,
      cep: this.formIncluirCliente.value.cep,
      estado: this.formIncluirCliente.value.estado,
      cidade: this.formIncluirCliente.value.cidade,
      endereco: this.formIncluirCliente.value.endereco,
      email: this.formIncluirCliente.value.email,
      ativo: this.formIncluirCliente.value.ativo,
    })

    this.estaEnviandoFormulario = true
    console.log(cliente)
  }
}
