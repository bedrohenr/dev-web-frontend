import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BolaoService } from 'src/app/services/bolao.service';
import { MensageriaService } from '../../core/mensageria/mensageria.service';

export interface BolaoDetalhado {
  id: number;
  nome: string;
  descricao: string;
  criadorId: number;
  opcaoId?: number; // ID da opção vencedora
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  criador: {
    id: number;
    nome: string;
    email: string;
  };
  opcoes: {
    id: number;
    descricao: string;
    apostas?: {
      id: number;
      valor: number;
      apostador: {
        id: number;
        nome: string;
      };
    }[];
  }[];
}

export interface ParticipanteResultado {
  posicao: number;
  nome: string;
  palpite: string;
  isGanhador: boolean;
}

@Component({
  selector: 'app-outcome-bolao',
  templateUrl: './outcome-bolao.component.html',
  styleUrls: ['./outcome-bolao.component.css']
})
export class OutcomeBolaoComponent implements OnInit {
  bolao: BolaoDetalhado | null = null;
  participantes: ParticipanteResultado[] = [];
  ganhadores: string[] = [];
  isLoading = false;
  bolaoId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bolaoService: BolaoService,
    private mensageriaService: MensageriaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bolaoId = +params['id'];
      if (this.bolaoId) {
        this.carregarBolaoDetalhado();
      }
    });
  }

  carregarBolaoDetalhado(): void {
    this.isLoading = true;
    
    this.bolaoService.obterBolao(this.bolaoId).subscribe({
      next: (response) => {
        console.log('Dados do bolão:', response);
        this.bolao = response;
        this.processarResultados();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar dados do bolão:', error);
        this.isLoading = false;
        this.mensageriaService.mensagemErro('Erro ao carregar os dados do bolão. Tente novamente.');
        this.router.navigate(['/boloes']);
      }
    });
  }

  private processarResultados(): void {
    if (!this.bolao) return;

    // Resetar arrays
    this.participantes = [];
    this.ganhadores = [];

    // Se não há opções, não há resultados para processar
    if (!this.bolao.opcoes || this.bolao.opcoes.length === 0) {
      return;
    }

    const participantesMap = new Map<number, ParticipanteResultado>();
    let posicao = 1;

    // Processar todas as apostas se existirem
    this.bolao.opcoes.forEach(opcao => {
      if (opcao.apostas && opcao.apostas.length > 0) {
        opcao.apostas.forEach(aposta => {
          const isGanhador = this.bolao!.opcaoId === opcao.id;
          
          if (!participantesMap.has(aposta.apostador.id)) {
            participantesMap.set(aposta.apostador.id, {
              posicao: isGanhador ? 1 : posicao,
              nome: aposta.apostador.nome,
              palpite: opcao.descricao,
              isGanhador: isGanhador
            });
            
            if (isGanhador) {
              this.ganhadores.push(aposta.apostador.nome);
            }
          }
        });
      }
    });

    // Se não há apostas nos dados da API, criar uma lista das opções disponíveis
    if (participantesMap.size === 0) {
      console.log('Nenhuma aposta encontrada na resposta da API');
      // Apenas mostrar as opções disponíveis
      this.participantes = [];
      return;
    }

    // Converter para array e ordenar (ganhadores primeiro)
    this.participantes = Array.from(participantesMap.values())
      .sort((a, b) => {
        if (a.isGanhador && !b.isGanhador) return -1;
        if (!a.isGanhador && b.isGanhador) return 1;
        return a.nome.localeCompare(b.nome);
      })
      .map((participante, index) => ({
        ...participante,
        posicao: index + 1
      }));
  }

  voltarParaLista(): void {
    this.router.navigate(['/boloes']);
  }

  temGanhador(): boolean {
    return this.bolao?.opcaoId != null;
  }

  getOpcaoVencedora(): string {
    if (!this.bolao?.opcaoId) return 'Ainda não definido';
    
    const opcaoVencedora = this.bolao.opcoes.find(opcao => opcao.id === this.bolao!.opcaoId);
    return opcaoVencedora?.descricao || 'Opção não encontrada';
  }

  getTotalOpcoes(): number {
    return this.bolao?.opcoes?.length || 0;
  }

  getTotalParticipantes(): number {
    return this.participantes.length;
  }

  formatarDataCriacao(): string {
    if (!this.bolao?.createdAt) return '';
    
    const data = new Date(this.bolao.createdAt);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getCriadorInfo(): string {
    return this.bolao?.criador?.nome || 'Criador não identificado';
  }
}
