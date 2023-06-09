import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/services/service.service';
import { CampeonatosModel } from './home.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{

  constructor(
    private service: Service
  ){}

  campeonatos: CampeonatosModel[] = []

  ngOnInit(): void {
    this.service.getTimes().subscribe(campeonatos  =>{
      this.campeonatos = campeonatos
    })
  }
}
