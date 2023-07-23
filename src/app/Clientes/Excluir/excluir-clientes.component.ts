import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesIncluirModel } from '../clientes.models';
import { ClientesService } from '../clientes.service';


@Component({
  selector: 'app-excluir-clientes',
  templateUrl: './excluir-clientes.component.html',
})
export class ExcluirClientesComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clientesService: ClientesService
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
    ativo: new FormControl<string | null>(null),
  })

  ngOnInit(): void {
    console.log('teste 2');
  }

  excluirCliente(){

  }
}
