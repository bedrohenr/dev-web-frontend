import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-bolao',
  templateUrl: './update-bolao.component.html',
  styleUrls: ['./update-bolao.component.css']
})
export class UpdateBolaoComponent {
  idBolao: number = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idBolao = Number(this.route.snapshot.paramMap.get('id'));
  }
}
