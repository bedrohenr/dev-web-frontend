import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BolaoService } from 'src/app/services/bolao.service';

@Component({
  selector: 'app-update-bolao',
  templateUrl: './update-bolao.component.html',
  styleUrls: ['./update-bolao.component.css']
})
export class UpdateBolaoComponent {
  idBolao: number = 0;
  model: any = null;
  opcoes = ['VASCO DA GAMA 1', 'VASCO DA GAMA 2', 'VASCO DA GAMA 3'];
  palpites = [
    { "user": "Pedro", "opcao": 1},
    { "user": "Thiago", "opcao": 2},
    { "user": "kaio", "opcao": 2},
    { "user": "Livia", "opcao": 0},
  ]
  constructor(
    private route: ActivatedRoute,
    private bolaoService: BolaoService
  ) { }

  ngOnInit(): void {
    this.idBolao = Number(this.route.snapshot.paramMap.get('id'));

    this.bolaoService.getBolaoById(this.idBolao).subscribe({
        next: (response) => {
          console.log('Bolão carregado!', response);
          this.model = response;
        },
          error: (error) => {
            console.error('Erro ao carregar bolão:', error);
          }
        });
  }
}
