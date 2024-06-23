import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, pipe, tap, throwError } from 'rxjs';
import { Clientes } from './Modelos/clientes.modelo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/clientes';
  private loggedIn = false;
  private clienteActual: Clientes | null = null;

  constructor(private http: HttpClient) { }

  registrarCliente(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(`${this.apiUrl}/register`, cliente);
  }

  registrarClientePymes(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(`${this.apiUrl}/register-pymes`, cliente);
  }

  registrarClienteEmpresariales(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(`${this.apiUrl}/register-empresariales`, cliente);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  loginCliente(correo: string, contraseña: string): Observable<any> {
    const body = { correo, contraseña };
    return this.http.post<any>(`${this.apiUrl}/login`, body)
      .pipe(
        tap(() => this.loggedIn = true),
        catchError(error => {
          this.loggedIn = false;
          return of(null);
        })
      );
  }

  getClienteActual(): Observable<Clientes | null> {
    return this.http.get<Clientes>(`${this.apiUrl}/profile`)
      .pipe(
        catchError(() => of(null))
      );
  }

  logout() {
    this.loggedIn = false;
    this.clienteActual = null;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error:', error.error.message);
    } else {
      console.error(
        `Código de error ${error.status}, ` +
        `Mensaje: ${error.error.message}`);
    }
    return throwError('Ocurrió un error al intentar procesar la solicitud. Por favor, intenta nuevamente más tarde.');
  }





}


