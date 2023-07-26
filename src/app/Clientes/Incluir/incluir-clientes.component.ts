import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesIncluirModel } from '../clientes.models';
import { ClientesService } from '../clientes.service';
import { ValidadorCpfCnpj } from 'src/app/core/validators/validatorCpfCnpj';


@Component({
  selector: 'app-incluir-clientes',
  templateUrl: './incluir-clientes.component.html',
})
export class IncluirClientesComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clientesService: ClientesService,

  ){}

  estaEnviandoFormulario = false
  formularioFoiEnviado = false

  formIncluirCliente = this.formBuilder.group({
    nome: new FormControl<string | null>(null, Validators.required),
    cpf: new FormControl<number | null>(null,[ Validators.required, ValidadorCpfCnpj]),
    dataDeNascimento: new FormControl<number | null>(null, Validators.required),
    cep: new FormControl<number | null>(null, Validators.required),
    estado: new FormControl<string | null>(null, Validators.required),
    cidade: new FormControl<string | null>(null, Validators.required),
    endereco: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    ativo: new FormControl<string | null>(null),
  })

  ngOnInit(): void {
  }

  salvarClientes(){
    this.formularioFoiEnviado = true
    console.log(this.formIncluirCliente)
    if(this.formIncluirCliente.valid){


      this.estaEnviandoFormulario = true

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

      this.clientesService.incluirClientes(cliente).subscribe({
        next: () => {
          this.estaEnviandoFormulario = false
          this.router.navigate(['Clientes'])
        },
        error: () => {
          this.estaEnviandoFormulario = false
        }

      })

    }

  }
}
