import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class MensageriaService {
  constructor(private toastrService: ToastrService) { }
  mensagemSucesso(mensagem: string): void {
    this.toastrService.success(mensagem, 'Sucesso!', {
      timeOut: 2000,
      closeButton: true,
      easeTime: 200,
    });
  }

  mensagemAlerta(mensagem: string) {
    this.toastrService.warning(mensagem, 'ATENÇÃO!', {
      timeOut: 0,
      closeButton: true,
      easeTime: 200,
      enableHtml: true,
      positionClass: 'toast-top-center'
    });
  }

  mensagemErro(mensagem: string): void {
    this.toastrService.error(mensagem, 'ERRO!', {
      timeOut: 0,
      closeButton: true,
      easeTime: 200,
      enableHtml: true,
      positionClass: 'toast-top-center'
    });
  }
}

