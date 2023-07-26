import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesAlterarModel, ClientesIncluirModel, ClientesListarModel } from '../clientes.models';
import { ClientesService } from '../clientes.service';
import { ValidadorCpfCnpj } from 'src/app/core/validators/validatorCpfCnpj';


@Component({
  selector: 'app-alterar-clientes',
  templateUrl: './alterar-clientes.component.html',
})
export class AlterarClientesComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clientesService: ClientesService,
    private activatedRoute: ActivatedRoute,
  ){}

  idCliente: string = this.activatedRoute.snapshot.params['id']
  estaEnviandoFormulario = false
  estaObtendoCliente = false
  formularioFoiEnviado = false

  formAlterarCliente = this.formBuilder.group({
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
    this.obterCliente();
  }

  alterarCliente(){
    this.formularioFoiEnviado = true
    if(this.formAlterarCliente.valid){

      this.estaEnviandoFormulario = true

      const cliente = new ClientesAlterarModel({
        id: this.idCliente,
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

      this.clientesService.alterarCliente(cliente).subscribe({
        next: () => {
          this.estaEnviandoFormulario = false
          this.formularioFoiEnviado = false
          this.router.navigate(['Clientes'])
        },
        error: () => {
          this.estaEnviandoFormulario = false
          this.formularioFoiEnviado = false
        }
      })

    }
  }

  obterCliente(){
    this.estaObtendoCliente = true

    this.clientesService.obterClientePorId(this.idCliente).subscribe({
      next:(cliente) => {

        this.formAlterarCliente.patchValue({
          nome: cliente.nome,
          cpf: cliente.cpf,
          dataDeNascimento: cliente.dataDeNascimento,
          cep: cliente.cep,
          estado: cliente.estado,
          cidade: cliente.cidade,
          endereco: cliente.endereco,
          email: cliente.email,
          ativo: cliente.ativo,
        })

        this.estaObtendoCliente = false
      },
      error:() => {
        this.estaObtendoCliente = false
      },
    })
  }
}
