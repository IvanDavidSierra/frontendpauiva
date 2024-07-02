import { Injectable } from '@angular/core';
import { Inmueble } from './Modelos/inmueble.modelo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoInmueble } from './Modelos/tipoinmueble.modelo';

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

  agregarInmueble(foto: File, inmueble: Inmueble, comercialId: number): Observable<any> {
    const formData = new FormData();
    formData.append('foto', foto);
    formData.append('inmueble', JSON.stringify(inmueble));
    formData.append('comercialId', String(comercialId));

    // Opciones para la solicitud HTTP que incluyen encabezados adicionales si es necesario
    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl, formData, options);
  }

  listarTipoInmueble(): Observable<TipoInmueble[]>{
    return this.http.get<TipoInmueble[]>(this.apiTipoInmubleUrl)
  }

  setTipoInmueble(tipo: number) {
    this.tipoInmueble = tipo;
  }

  getTipoInmueble(): number {
    return this.tipoInmueble;
  }
}
