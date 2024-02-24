import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ValidacoesCustomizadasService } from '../../services/validacoes-customizadas/validacoes-customizadas.service';

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
    private validadorCustomizado: ValidacoesCustomizadasService
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
    console.log('Enviou form')
  }

  confirmacaoSenhaValidate() {
    if(this.senha.touched)
      this.confirmaSenha.updateValueAndValidity();
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
