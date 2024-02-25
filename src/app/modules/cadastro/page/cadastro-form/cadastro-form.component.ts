import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ValidacoesCustomizadasService } from '../../services/validacoes-customizadas/validacoes-customizadas.service';
import { Usuario } from '../../model/usuario/usuario';
import { HttpCadastroService } from '../../services/http-cadastro/http-cadastro.service';
import { ErrorValidation } from '../../model/error-validation/error-validation';
import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  styleUrl: './cadastro-form.component.scss'
})
export class CadastroFormComponent implements OnInit {

  readonly btnText:string = "Vai"
  cadastroForm!: FormGroup
  errorValidation!: ErrorValidation

  constructor(
    private formBuilder: FormBuilder,
    private validadorCustomizado: ValidacoesCustomizadasService,
    private serviceCadastro: HttpCadastroService,
    private errorService: ErrorHandlerService
  ){}

  ngOnInit(): void {
    this.cadastroForm = new FormGroup(
      {
        nome: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        senha: new FormControl('', [Validators.required]),
        confirmaSenha: new FormControl('', [Validators.required]),
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
        next(response) {
          console.log(response)
        },
        error: (err) => this.errorHandler(err)
      })
  }

  confirmacaoSenhaValidate() {
    if(this.senha.touched)
      this.confirmaSenha.updateValueAndValidity();
  }

  private errorHandler(err: any) {
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
