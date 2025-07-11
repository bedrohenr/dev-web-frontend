import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BolaoService } from 'src/app/services/bolao.service';

@Component({
  selector: 'app-update-bolao',
  templateUrl: './update-bolao.component.html',
  styleUrls: ['./update-bolao.component.css']
})
export class UpdateBolaoComponent {
  isLoading = true;
  isLoadingEscolha = false;
  idBolao: number = 0;
  model: any = null;
  opcoes = [{}];
  palpites = [
    { "user": "Pedro", "opcao": 1},
    { "user": "Thiago", "opcao": 2},
    { "user": "kaio", "opcao": 2},
    { "user": "Livia", "opcao": 0},
  ]
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bolaoService: BolaoService
  ) { }

  ngOnInit(): void {
    this.idBolao = Number(this.route.snapshot.paramMap.get('id'));

    this.bolaoService.obterBolao(this.idBolao).subscribe({
      next: (response) => {
        console.log('Bolão carregado!', response);
        this.isLoading = false;
        if(response.opcaoId !== null){
          alert("Este bolão ja foi finalizado.");
          this.router.navigate([`/outcome/${this.idBolao}`]);
        }
        this.model = response;

      },
        error: (error) => {
          this.isLoading = false;
          console.error('Erro ao carregar bolão:', error);
        }
      });
    }

  escolherOpcao(id: number){
    this.isLoadingEscolha = true;
    const dados = {
      "idOpcaoGanhador": id
    }
    this.bolaoService.escolherOpcao(this.idBolao, dados).subscribe({
      next: (response) => {
        console.log('Opção escolhida!', response);
        this.isLoading = false;
        alert("Opção escolhida com sucesso");
        this.router.navigate([`outcome/${this.idBolao}`]);
      },
        error: (error) => {
          this.isLoading = false;
          console.error('Erro ao escolher opção:', error);
          alert("Erro ao escolher opção");
        }
      });
    }

}
