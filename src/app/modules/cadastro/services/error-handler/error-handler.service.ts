import { Injectable } from '@angular/core';
import { ErrorValidation } from '../../model/error-validation/error-validation';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private readonly INVALID_DATA = 'dados_invalidos';

  constructor(){}

  public handler(err:any):any {
    const e = err?.error
    if(e?.message === this.INVALID_DATA) return new ErrorValidation(e);
  }
}
