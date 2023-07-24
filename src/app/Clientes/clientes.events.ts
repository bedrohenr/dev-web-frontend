import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MensageriaService } from 'src/app/core/mensageria/mensageria.service';

@Injectable({ providedIn: 'root' })
export class ClientesEvents {

  constructor(private mensageriaService: MensageriaService) {
    this.clienteFoiIncluido.subscribe(() => {
      this.mensageriaService.mensagemSucesso(
        'Cliente incluído com sucesso!'
      );
    });

    this.clienteFoiAlterado.subscribe(() => {
      this.mensageriaService.mensagemSucesso(
        'Cliente alterado com sucesso!'
      );
    });

    this.clienteFoiExcluido.subscribe(() => {
      this.mensageriaService.mensagemSucesso(
        'Cliente excluído com sucesso!'
      );
    });

  }

  private subjectClienteFoiIncluido = new Subject<any>();
  private subjectClienteFoiAlterado = new Subject<any>();
  private subjectClienteFoiExcluido = new Subject<void>();


  get clienteFoiIncluido(): Subject<any> {
    return this.subjectClienteFoiIncluido;
  }

  get clienteFoiAlterado(): Subject<any> {
    return this.subjectClienteFoiAlterado;
  }

  get clienteFoiExcluido(): Subject<any> {
    return this.subjectClienteFoiExcluido;
  }
}
