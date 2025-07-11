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
  userId: number;
  opcaoId: number;
  dataPalpite?: string;
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
  palpitesDetalhados: any[] = []; // Lista detalhada de palpites carregados da API
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
        this.carregarPalpites(); // Carregar palpites após carregar o bolão
      },
      error: (error) => {
        console.error('Erro ao carregar dados do bolão:', error);
        this.isLoading = false;
        this.mensageriaService.mensagemErro('Erro ao carregar os dados do bolão. Tente novamente.');
        this.router.navigate(['/boloes']);
      }
    });
  }

  carregarPalpites(): void {
    this.bolaoService.obterPalpitesBolao(this.bolaoId).subscribe({
      next: (response) => {
        console.log('Palpites do bolão:', response);
        this.palpitesDetalhados = response.data || [];
        this.processarResultados();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar palpites:', error);
        // Mesmo se falhar ao carregar palpites, processar com dados existentes
        this.processarResultados();
        this.isLoading = false;
      }
    });
  }

  private processarResultados(): void {
    if (!this.bolao) return;

    // Resetar arrays
    this.participantes = [];
    this.ganhadores = [];

    // Se há palpites detalhados da API, usar eles
    if (this.palpitesDetalhados && this.palpitesDetalhados.length > 0) {
      const participantesMap = new Map<number, ParticipanteResultado>();

      this.palpitesDetalhados.forEach(palpite => {
        const isGanhador = this.bolao!.opcaoId === palpite.opcao.id;
        
        if (!participantesMap.has(palpite.apostador.id)) {
          participantesMap.set(palpite.apostador.id, {
            posicao: isGanhador ? 1 : 0,
            nome: palpite.apostador.nome,
            palpite: palpite.opcao.descricao,
            isGanhador: isGanhador,
            userId: palpite.apostador.id,
            opcaoId: palpite.opcao.id,
            dataPalpite: palpite.createdAt
          });
          
          if (isGanhador) {
            this.ganhadores.push(palpite.apostador.nome);
          }
        }
      });

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
      
      return;
    }

    // Fallback: usar dados das apostas incluídas no bolão (código original)
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
              isGanhador: isGanhador,
              userId: aposta.apostador.id,
              opcaoId: opcao.id
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
    // Preferir contagem de palpites detalhados se disponível
    if (this.palpitesDetalhados && this.palpitesDetalhados.length > 0) {
      return this.palpitesDetalhados.length;
    }
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

  formatarDataPalpite(dataPalpite?: string): string {
    if (!dataPalpite) return '';
    
    const data = new Date(dataPalpite);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getEstatisticasPorOpcao(): any[] {
    if (!this.bolao?.opcoes || this.participantes.length === 0) {
      return [];
    }

    const estatisticas = this.bolao.opcoes.map(opcao => {
      const palpitesParaEstaOpcao = this.participantes.filter(p => p.palpite === opcao.descricao);
      const quantidade = palpitesParaEstaOpcao.length;
      const porcentagem = this.participantes.length > 0 
        ? Math.round((quantidade / this.participantes.length) * 100) 
        : 0;

      return {
        nome: opcao.descricao,
        quantidade: quantidade,
        porcentagem: porcentagem,
        isVencedora: this.bolao?.opcaoId === opcao.id
      };
    });

    // Ordenar por quantidade de palpites (decrescente)
    return estatisticas.sort((a, b) => b.quantidade - a.quantidade);
  }
}
