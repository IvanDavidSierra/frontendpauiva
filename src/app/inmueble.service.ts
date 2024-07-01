import { Injectable } from '@angular/core';
import { Inmueble } from './Modelos/inmueble.modelo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {
  private apiUrl = `http://localhost:8080/inmueble/submit`;
  private tipoInmueble: string = '';

  constructor(private http: HttpClient) { }

  listar(): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(this.apiUrl);
  }
  
  listarId(id: number): Observable<Inmueble> {
    return this.http.get<Inmueble>(`${this.apiUrl}/${id}`);
  }

  setTipoInmueble(tipo: string) {
    this.tipoInmueble = tipo;
  }

  getTipoInmueble(): string {
    return this.tipoInmueble;
  }
}
