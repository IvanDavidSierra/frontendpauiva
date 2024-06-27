import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Clientes } from '../app/Modelos/clientes.modelo';
import { Router } from '@angular/router';
import { TipoClienteService } from './tipo-cliente.service';
import { TipoCliente } from './Modelos/tipocliente.modelo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/clientes';
  private currentUser: Clientes | null = null;

  constructor(private http: HttpClient, private router: Router, private tipoClienteService: TipoClienteService) { }

  login(correo: string): Observable<Clientes> {
    return this.http.post<Clientes>(`${this.apiUrl}/login`, { correo });
  }

  registrarCliente(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(`${this.apiUrl}/register`, cliente).pipe(
      tap(user => this.setCurrentUser(user)),
      catchError(this.handleError<Clientes>('registrarCliente'))
    );
  }

  registrarClientePymes(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(`${this.apiUrl}/register-pymes`, cliente).pipe(
      tap(user => this.setCurrentUser(user)),
      catchError(this.handleError<Clientes>('registrarClientePymes'))
    );
  }

  registrarClienteEmpresariales(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(`${this.apiUrl}/register-empresariales`, cliente).pipe(
      tap(user => this.setCurrentUser(user)),
      catchError(this.handleError<Clientes>('registrarClienteEmpresariales'))
    );
  }

  getClienteActual(): Observable<Clientes | null> {
    return this.http.get<Clientes>(`${this.apiUrl}/profile`).pipe(
      catchError(() => of(null))
    );
  }

  setCurrentUser(user: Clientes) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): Clientes | null {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      this.currentUser = storedUser ? JSON.parse(storedUser) as Clientes : null;
    }
    return this.currentUser;
  }

  getTipoClientes(): Observable<TipoCliente[]> {
    return this.tipoClienteService.listarTiposClientes();
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Aquí puedes redirigir a la página de login o mostrar un mensaje de error al usuario
        console.error('Unauthorized access. Redirecting to login page...');
        this.router.navigate(['/authusers']);
      }
      return of(result as T);
    };
  }
}



