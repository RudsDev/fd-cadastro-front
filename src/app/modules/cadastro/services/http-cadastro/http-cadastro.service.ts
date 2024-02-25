import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../model/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class HttpCadastroService {

  private base = 'http://127.0.0.1:33018/api'
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
