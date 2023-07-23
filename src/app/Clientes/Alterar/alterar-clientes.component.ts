import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesIncluirModel } from '../clientes.models';
import { ClientesService } from '../clientes.service';


@Component({
  selector: 'app-alterar-clientes',
  templateUrl: './alterar-clientes.component.html',
})
export class AlterarClientesComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clientesService: ClientesService
  ){}

  estaEnviandoFormulario = false

  formAlterarCliente = this.formBuilder.group({
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

  alterarCliente(){

    if(this.formAlterarCliente.valid){

      this.estaEnviandoFormulario = true

      const cliente = new ClientesIncluirModel({
        nome: this.formAlterarCliente.value.nome,
        cpf: this.formAlterarCliente.value.cpf,
        dataDeNascimento: this.formAlterarCliente.value.dataDeNascimento,
        cep: this.formAlterarCliente.value.cep,
        estado: this.formAlterarCliente.value.estado,
        cidade: this.formAlterarCliente.value.cidade,
        endereco: this.formAlterarCliente.value.endereco,
        email: this.formAlterarCliente.value.email,
        ativo: this.formAlterarCliente.value.ativo,
      })

      this.clientesService.incluirClientes(cliente)
      this.router.navigate(['Clientes'])
    }

  }
}
