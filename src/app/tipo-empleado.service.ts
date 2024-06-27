import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoCliente } from './Modelos/tipocliente.modelo';
import { Observable } from 'rxjs';
import { TipoEmpleado } from './Modelos/tipoempleado.modelo';

@Injectable({
  providedIn: 'root'
})
export class TipoEmpleadoService {
  private apiUrl = 'http://localhost:8080/tipoempleado/submit';
  constructor(private http: HttpClient) { }

  listarTiposEmpleados(): Observable<TipoEmpleado[]> {
    return this.http.get<TipoEmpleado[]>(this.apiUrl);
  }
}
