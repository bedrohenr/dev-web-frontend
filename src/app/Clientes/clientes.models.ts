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

export class ClientesAlterarModel{
  id?: string | null;
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
    id?: string | null;
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
    this.id = dados.id
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


export class ClientesListarModel{
  id!: string;
  nome!: string;
  cpf!: number;
  dataDeNascimento!: number;
  cep!: number;
  estado!: string;
  cidade!: string;
  endereco!: string;
  email!: string;
  ativo!: string;
}
