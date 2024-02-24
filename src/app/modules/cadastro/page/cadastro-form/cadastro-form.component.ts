import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group(
      {
        nome: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        senha: [null, [Validators.required]],
        confirmaSenha: [null, [Validators.required]],
      }
    )
  }

  onSubmit() {
    if(this.formInvalido) return
    console.log('Enviou form')
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
