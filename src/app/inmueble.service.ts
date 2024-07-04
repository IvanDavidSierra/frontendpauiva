import { Injectable } from '@angular/core';
import { Inmueble } from './modelos/inmueble.modelo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoInmueble } from './modelos/tipoinmueble.modelo';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {
  private apiUrl = `http://localhost:8080/inmueble/submit`;
  private apiTipoInmubleUrl = 'http://localhost:8080/tipoinmueble/submit';
  private tipoInmueble: number = 0;

  constructor(private http: HttpClient) { }

  listar(): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(this.apiUrl);
  }
  
  listarId(id: number): Observable<Inmueble> {
    return this.http.get<Inmueble>(`${this.apiUrl}/${id}`);
  }

  agregarInmueble(inmueble: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, inmueble);
  }

  listarTipoInmueble(): Observable<TipoInmueble[]>{
    return this.http.get<TipoInmueble[]>(this.apiTipoInmubleUrl)
  }

  update(id: number, inmueble: Inmueble): Observable<Inmueble> {
    return this.http.put<Inmueble>(`${this.apiUrl}/${id}`, inmueble);
  }

  delete(id: number): Observable<Inmueble> {
    return this.http.delete<Inmueble>(`${this.apiUrl}/${id}`);
  }

  setTipoInmueble(tipo: number) {
    this.tipoInmueble = tipo;
  }

  getTipoInmueble(): number {
    return this.tipoInmueble;
  }
}
