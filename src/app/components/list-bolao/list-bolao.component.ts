import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BolaoService } from 'src/app/services/bolao.service';
import { MensageriaService } from '../../core/mensageria/mensageria.service';

export interface Bolao {
  id: number;
  nome: string;
  descricao: string;
  criadorId: number;
  criadorNome?: string;
  visibilidade: number;
  dataCriacao: Date;
  ativo: boolean;
  totalParticipantes?: number;
  opcoes?: string[];
}

@Component({
  selector: 'app-list-bolao',
  templateUrl: './list-bolao.component.html',
  styleUrls: ['./list-bolao.component.css']
})
export class ListBolaoComponent implements OnInit {
  boloes: Bolao[] = [];
  boloesFiltered: Bolao[] = [];
  isLoading = false;
  searchTerm = '';
  filtroVisibilidade = 'todos'; // 'todos', 'publicos', 'privados'
  filtroStatus = 'todos'; // 'todos', 'ativos', 'inativos'

  constructor(
    private router: Router,
    private bolaoService: BolaoService,
    private mensageriaService: MensageriaService
  ) { }

  ngOnInit(): void {
    this.carregarBoloes();
  }

  carregarBoloes(): void {
    this.isLoading = true;
    
    this.bolaoService.getAllGrupo().subscribe({
      next: (response) => {
        console.log('Resposta da API:', response);
        
        // Adaptar os dados da API para o formato esperado pelo componente
        this.boloes = this.adaptarDadosAPI(response.data || response);
        this.boloesFiltered = [...this.boloes];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar bolões:', error);
        this.isLoading = false;
        this.mensageriaService.mensagemErro('Erro ao carregar os bolões. Tente novamente.');
        
        // Fallback para dados mock em caso de erro
        this.carregarDadosMock();
      }
    });
  }

  private adaptarDadosAPI(dadosAPI: any[]): Bolao[] {
    return dadosAPI.map(item => ({
      id: item.id,
      nome: item.nome,
      descricao: item.descricao || '',
      criadorId: item.criadorId,
      criadorNome: item.criador?.nome || 'Usuário não identificado',
      visibilidade: 2, // Default: público (até implementarmos no banco)
      dataCriacao: item.createdAt ? new Date(item.createdAt) : new Date(),
      ativo: item.deletedAt ? false : true, // Baseado no soft delete
      totalParticipantes: item.participantes?.length || 0,
      opcoes: item.opcoes?.map((opcao: any) => opcao.descricao) || []
    }));
  }

  private carregarDadosMock(): void {
    // Dados mock como fallback
    this.boloes = [
      {
        id: 1,
        nome: 'Flamengo x Botafogo',
        descricao: 'Bolão criado para o jogo de hoje',
        criadorId: 1,
        criadorNome: 'João Silva',
        visibilidade: 2,
        dataCriacao: new Date('2025-01-10'),
        ativo: true,
        totalParticipantes: 15,
        opcoes: ['Flamengo', 'Empate', 'Botafogo']
      },
      {
        id: 2,
        nome: 'Copa do Mundo 2026',
        descricao: 'Palpites sobre o campeão mundial',
        criadorId: 2,
        criadorNome: 'Maria Santos',
        visibilidade: 2,
        dataCriacao: new Date('2025-01-08'),
        ativo: true,
        totalParticipantes: 50,
        opcoes: ['Brasil', 'Argentina', 'França', 'Alemanha']
      },
      {
        id: 3,
        nome: 'Eleições 2026',
        descricao: 'Quem será o próximo presidente?',
        criadorId: 1,
        criadorNome: 'João Silva',
        visibilidade: 1,
        dataCriacao: new Date('2025-01-05'),
        ativo: false,
        totalParticipantes: 8,
        opcoes: ['Candidato A', 'Candidato B', 'Candidato C']
      }
    ];
    
    this.boloesFiltered = [...this.boloes];
  }

  aplicarFiltros(): void {
    let resultado = [...this.boloes];

    // Filtro por termo de busca
    if (this.searchTerm.trim()) {
      const termo = this.searchTerm.toLowerCase();
      resultado = resultado.filter(bolao => 
        bolao.nome.toLowerCase().includes(termo) ||
        bolao.descricao.toLowerCase().includes(termo) ||
        bolao.criadorNome?.toLowerCase().includes(termo)
      );
    }

    // Filtro por visibilidade
    if (this.filtroVisibilidade !== 'todos') {
      const visibilidade = this.filtroVisibilidade === 'publicos' ? 2 : 1;
      resultado = resultado.filter(bolao => bolao.visibilidade === visibilidade);
    }

    // Filtro por status
    if (this.filtroStatus !== 'todos') {
      const ativo = this.filtroStatus === 'ativos';
      resultado = resultado.filter(bolao => bolao.ativo === ativo);
    }

    this.boloesFiltered = resultado;
  }

  onSearchChange(): void {
    this.aplicarFiltros();
  }

  onFiltroVisibilidadeChange(): void {
    this.aplicarFiltros();
  }

  onFiltroStatusChange(): void {
    this.aplicarFiltros();
  }

  limparFiltros(): void {
    this.searchTerm = '';
    this.filtroVisibilidade = 'todos';
    this.filtroStatus = 'todos';
    this.boloesFiltered = [...this.boloes];
  }

  recarregarDados(): void {
    this.carregarBoloes();
  }

  criarNovoBolao(): void {
    this.router.navigate(['/create']);
  }

  visualizarBolao(bolao: Bolao): void {
    // Navega para a tela de outcome/resultado do bolão
    this.router.navigate(['/outcome', bolao.id]);
  }

  editarBolao(bolao: Bolao): void {
    // Navega para a tela de edição do bolão
    this.router.navigate(['/update', bolao.id]);
  }

  excluirBolao(bolao: Bolao): void {
    if (confirm(`Tem certeza que deseja excluir o bolão "${bolao.nome}"?`)) {
      this.isLoading = true;
      
      this.bolaoService.excluirBolao(bolao.id).subscribe({
        next: (response) => {
          console.log('Bolão excluído:', response);
          this.boloes = this.boloes.filter(b => b.id !== bolao.id);
          this.aplicarFiltros();
          this.isLoading = false;
          this.mensageriaService.mensagemSucesso('Bolão excluído com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao excluir bolão:', error);
          this.isLoading = false;
          
          // Verificar se é erro de autorização ou outro erro específico
          const errorMessage = error.error?.message || 
                              error.message || 
                              'Erro ao excluir o bolão. Tente novamente.';
          this.mensageriaService.mensagemErro(errorMessage);
        }
      });
    }
  }

  getVisibilidadeTexto(visibilidade: number): string {
    return visibilidade === 1 ? 'Privado' : 'Público';
  }

  getStatusTexto(ativo: boolean): string {
    return ativo ? 'Ativo' : 'Inativo';
  }

  getStatusClass(ativo: boolean): string {
    return ativo ? 'badge bg-success' : 'badge bg-secondary';
  }

  getVisibilidadeClass(visibilidade: number): string {
    return visibilidade === 1 ? 'badge bg-warning' : 'badge bg-info';
  }
}
