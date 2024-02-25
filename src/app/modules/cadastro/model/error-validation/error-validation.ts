
type Field = {nome:string, mensagem:string}
export class ErrorValidation {

  private _dataHora:string
  private _message:string
  private _error:number
  private _campos: Field[]

  constructor(error:any) {
    this._dataHora = error?.dataHora
    this._message = error?.message
    this._error = error?.error
    this._campos = error?.campos
  }

  get dataHora(): string {
    return this._dataHora
  }

  get message(): string {
    return this._message
  }

  get error(): number {
    return this._error
  }

  get campos(): Field[] {
    return this._campos
  }

}
