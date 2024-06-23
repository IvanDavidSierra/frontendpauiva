import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  registrarCliente(cliente: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, cliente);
  }

  loginCliente(correo: string, contraseña: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { correo, contraseña });
  }
}


