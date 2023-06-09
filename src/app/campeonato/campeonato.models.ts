export class CampeonatosModel{
  campeonato_id!: number
  dicao_atual!: EdicaoAtualModel
  fase_atual!: FaseAtualModel
  logo!: string
  nome!: string
  nome_popular!: string
  regiao!: string
  rodada_atual!: RodadaAtualModel
  slug!: string
  status!: string
  tipo!: string
  _link!: string
}
export class EdicaoAtualModel{
  edicao_id!: number
  nome!: string
  nome_popular!: string
  slug!: string
  temporada!: string
}
export class FaseAtualModel{
  fase_id!: number
  nome!: string
  slug!: string
  tipo!: string
  _link!: string
  }
export class RodadaAtualModel{
  nome!: string
  rodada!: number
  slug!: string
  status!: string
}
