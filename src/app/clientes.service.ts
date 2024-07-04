import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clientes } from './modelos/clientes.modelo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private baseUrl: string = 'http://localhost:8080/clientes/submit'; // Cambia esto a tu URL base del backend

  constructor(private http: HttpClient) { }

  listar(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(`${this.baseUrl}`);
  }

  agregar(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(`${this.baseUrl}`, cliente);
  }

  listarId(id: number): Observable<Clientes> {
    return this.http.get<Clientes>(`${this.baseUrl}/${id}`);
  }

  editar(id: number, cliente: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(`${this.baseUrl}/${id}`, cliente);
  }

  delete(id: number): Observable<Clientes> {
    return this.http.delete<Clientes>(`${this.baseUrl}/${id}`);
  }
}
