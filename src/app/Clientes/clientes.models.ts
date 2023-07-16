export class ClientesIncluirModel{
  nome?: string | null;
  cpf?: number | null;
  dataDeNascimento?: number | null;
  cep?: number | null;
  estado?: string | null;
  cidade?: string | null;
  endereco?: string | null;
  email?: string | null;
  ativo?: string | null;
  constructor(dados: {
    nome?: string | null;
    cpf?: number | null;
    dataDeNascimento?: number | null;
    cep?: number | null;
    estado?: string | null;
    cidade?: string | null;
    endereco?: string | null;
    email?: string | null;
    ativo?: string | null;
  }){
    this.nome = dados.nome
    this.cpf = dados.cpf
    this.dataDeNascimento = dados.dataDeNascimento
    this.cep = dados.cep
    this.estado = dados.estado
    this.cidade = dados.cidade
    this.endereco = dados.endereco
    this.email = dados.email
    this.ativo = dados.ativo
  }
}
