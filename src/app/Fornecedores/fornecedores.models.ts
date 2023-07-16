export class FornecedoresIncluirModel{
    nomeFantasia?: string | null;
    razaoSocial?: string | null;
    ramoDeAtividade?: string | null;
    pessoa?: string | null;
    cnpj?: number | null
    cep?: number | null
    estado?: string | null;
    cidade?: string | null;
    endereco?: string | null;
    email?: string | null;
    ativo?: string | null;
  constructor(dados: {
    nomeFantasia?: string | null;
    razaoSocial?: string | null;
    ramoDeAtividade?: string | null;
    pessoa?: string | null;
    cnpj?: number | null
    cep?: number | null
    estado?: string | null;
    cidade?: string | null;
    endereco?: string | null;
    email?: string | null;
    ativo?: string | null;
  }){
    this.nomeFantasia = dados.nomeFantasia
    this.razaoSocial = dados.razaoSocial
    this.ramoDeAtividade = dados.ramoDeAtividade
    this.pessoa = dados.pessoa
    this.cnpj = dados.cnpj
    this.cep = dados.cep
    this.estado = dados.estado
    this.cidade = dados.cidade
    this.endereco = dados.endereco
    this.email = dados.email
    this.ativo = dados.ativo

  }
}
