import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private clientesService: ClientesService,
    private activatedRoute: ActivatedRoute,
  ){}

  idCliente: string = this.activatedRoute.snapshot.params['id']
  nomeCliente: string = this.activatedRoute.snapshot.params['nome']
  estaEnviandoFormulario = false

  ngOnInit(): void {

  }

  excluirCliente(){
    this.clientesService.excluirCliente(this.idCliente).subscribe({
     next:() => {this.router.navigate(['Clientes'])},
    })
  }
}
