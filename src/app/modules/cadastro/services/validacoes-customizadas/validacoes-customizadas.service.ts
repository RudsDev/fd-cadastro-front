import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacoesCustomizadasService {

  constructor() { }

  confirmaSenha(senha: AbstractControl): ValidatorFn {
    return (confirmaSenha: AbstractControl): ValidationErrors | null => {

      const controleSenha = confirmaSenha;
      const controleconfirmaSenha = senha;

      const hasControleSenhaAndConfirmacao = !controleSenha || !controleconfirmaSenha
      const hasControleSenhaConfirmacaoErrors = controleconfirmaSenha?.errors
        && !controleconfirmaSenha.errors?.['passwordMismatch']

      const isControleAndSenhaIguais = controleSenha?.value !== controleconfirmaSenha?.value

      if (hasControleSenhaAndConfirmacao) return null;
      if (hasControleSenhaConfirmacaoErrors) return null;

      return isControleAndSenhaIguais
        ? { passwordMismatch: { value: true } }
        : null;
    };
  }
}
