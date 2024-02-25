import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ValidacoesCustomizadasService } from '../../services/validacoes-customizadas/validacoes-customizadas.service';
import { Usuario } from '../../model/usuario';
import { HttpCadastroService } from '../../services/http-cadastro/http-cadastro.service';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  styleUrl: './cadastro-form.component.scss'
})
export class CadastroFormComponent implements OnInit {

  @Input() btnText:string = "Vai"

  cadastroForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private validadorCustomizado: ValidacoesCustomizadasService,
    private serviceCadastro: HttpCadastroService
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
        error: (err) => console.log(err),
      })
  }

  confirmacaoSenhaValidate() {
    if(this.senha.touched)
      this.confirmaSenha.updateValueAndValidity();
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
