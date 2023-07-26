import { AbstractControl } from '@angular/forms';

export function ValidadorCpfCnpj(control: AbstractControl): { [key: string]: any } | null {
  if (control.value) {
    const cpfCnpj = control.value.toString().replace(/[^0-9]/g, '');
    let ehValido = false;
    if (cpfCnpj.length === 11) {
      ehValido = validarCpf(cpfCnpj);
    }

    if (cpfCnpj.length === 14) {
      ehValido = validarCnpj(cpfCnpj);
    }

    function calcularDigitos(digitos: any, posicoes = 10, somaDigitos = 0) {
      for (const digito of digitos) {
        somaDigitos = somaDigitos + (digito * posicoes);
        posicoes--;
        if (posicoes < 2) {
          posicoes = 9;
        }
      }
      somaDigitos = somaDigitos % 11;
      if (somaDigitos < 2) {
        somaDigitos = 0;
      } else {
        somaDigitos = 11 - somaDigitos;
      }
      return digitos + somaDigitos;

    }
    function validarCpf(cpf: any) {
      const digitos = cpf.substr(0, 9);
      let cpfComDigito = calcularDigitos(digitos);
      cpfComDigito = calcularDigitos(cpfComDigito, 11);

      if (cpfComDigito === cpf) {
        return true;
      } else {
        return false;
      }

    }

    function validarCnpj(cnpj: any) {
      const cnpjOriginal = cnpj;
      const primeirosNumerosCnpj = cnpj.substr(0, 12);
      const primeiroCalculo = calcularDigitos(primeirosNumerosCnpj, 5);
      const segundoCalculo = calcularDigitos(primeiroCalculo, 6);
      const cnpjValidado = segundoCalculo;
      if (cnpjValidado === cnpjOriginal) {
        return true;
      }
      return false;
    }

    if (!ehValido) {
      return { invalidCpfCnpj: { valid: false, value: control.value } };
    }
    return null;
  }
  return null;

}
