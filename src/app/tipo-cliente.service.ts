import { Injectable } from '@angular/core';
import { TipoCliente } from './modelos/tipocliente.modelo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoClienteService {
  private apiUrl = 'http://localhost:8080/tipocliente/submit';

  constructor(private http: HttpClient) { }

  listarTiposClientes(): Observable<TipoCliente[]> {
    return this.http.get<TipoCliente[]>(this.apiUrl);
  }
}
