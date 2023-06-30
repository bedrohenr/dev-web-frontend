import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{

  constructor(
    private service: Service,
    private router: Router
  ){}


  ngOnInit(): void {
  }

  irParaClientes(){
    this.router.navigate(['/Clientes'])
  }
}
