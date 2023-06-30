import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{

  constructor(
    private service: Service
  ){}


  ngOnInit(): void {

  }
}
