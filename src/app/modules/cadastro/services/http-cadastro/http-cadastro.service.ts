import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../model/usuario/usuario';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpCadastroService {

  private base = environment.api
  private resource = '/v1/usuarios'

  constructor(private http: HttpClient) { }

  save(usuario:Usuario):Observable<any> {
    const url = `${this.base}${this.resource}`
    return this.http.post(url, usuario, {
      responseType: "json",
      observe: "response",
    })
  }
}
