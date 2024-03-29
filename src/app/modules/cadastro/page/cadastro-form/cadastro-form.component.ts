import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidacoesCustomizadasService } from '../../services/validacoes-customizadas/validacoes-customizadas.service';
import { Usuario } from '../../model/usuario/usuario';
import { HttpCadastroService } from '../../services/http-cadastro/http-cadastro.service';
import { ErrorValidation } from '../../model/error-validation/error-validation';
import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  styleUrl: './cadastro-form.component.scss',
  providers: [MessageService]
})
export class CadastroFormComponent implements OnInit {

  public readonly btnText:string = "Vai"
  public readonly minLengthName = 3
  public readonly maxLengthName = 50
  public readonly minLengthSenha = 6
  public readonly maxLengthSenha = 20

  cadastroForm!: FormGroup
  errorValidation!: ErrorValidation

  constructor(
    private validadorCustomizado: ValidacoesCustomizadasService,
    private serviceCadastro: HttpCadastroService,
    private errorService: ErrorHandlerService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.cadastroForm = new FormGroup(
      {
        nome: new FormControl('', [
          Validators.required,
          Validators.minLength(this.minLengthName),
          Validators.maxLength(this.maxLengthName)
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email]
        ),
        senha: new FormControl('', [
          Validators.required,
          // Validators.minLength(this.minLengthSenha),
          // Validators.maxLength(this.maxLengthSenha)
        ]),
        confirmaSenha: new FormControl('', [
          Validators.required
        ]),
      }
    )

    this.cadastroForm
      .get('confirmaSenha')
      ?.setValidators(this.validadorCustomizado.confirmaSenha(this.senha))
  }

  onSubmit() {
    if(this.formInvalido) return
    this.serviceCadastro
      .save(this.formToModel())
      .subscribe({
        next: (resp) => this.showToast(),
        error: (err: HttpErrorResponse) => this.errorHandler(err)
      })
  }

  confirmacaoSenhaValidate() {
    if(this.senha.touched)
      this.confirmaSenha.updateValueAndValidity();
  }

  lengthValidationMessage(min: number, max: number) {
    return `Deve ter entre ${min} e ${max} caracteres.`
  }

  private showToast() {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro realizado com sucesso.' });
  }

  private showToastError() {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível se conectar a API.'});
  }

  private errorHandler(err: HttpErrorResponse) {
    if(err.status === 500) this.showToastError()
    this.errorValidation = this.errorService.handler(err)
  }

  private formToModel() {
    return new Usuario(
      this.nome.value,
      this.email.value,
      this.senha.value,
      this.confirmaSenha.value
    )
  }

  get nome(){
    return this.cadastroForm.get('nome')!
  }

  get email(){
    return this.cadastroForm.get('email')!
  }

  get senha(){
    return this.cadastroForm.get('senha')!
  }

  get confirmaSenha(){
    return this.cadastroForm.get('confirmaSenha')!
  }

  get formInvalido() {
    return this.cadastroForm.invalid
  }

}
