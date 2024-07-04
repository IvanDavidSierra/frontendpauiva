import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TipoEmpleadoService } from './tipo-empleado.service';
import { Observable, catchError, of } from 'rxjs';
import { Empleados } from './modelos/empleados.modelo';
import { TipoEmpleado } from './modelos/tipoempleado.modelo';


@Injectable({
  providedIn: 'root'
})
export class AuthempleadoService {
  private apiEmpleadosUrl = 'http://localhost:8080/empleados';
  private currentUserEmpleado: Empleados | null = null;
  constructor(private http: HttpClient, private router: Router, private tipoEmpleadoService: TipoEmpleadoService) { }


  loginEmpleados(correo: string): Observable<Empleados> {
    return this.http.post<Empleados>(`${this.apiEmpleadosUrl}/login`, { correo });
  }

  obtenerEmpleados(): Observable<Empleados[]> {
    return this.http.get<Empleados[]>(`${this.apiEmpleadosUrl}/submit`);
  }

  setCurrentUser(user: Empleados) {
    this.currentUserEmpleado = user;
    localStorage.setItem('currentUserEmpleado', JSON.stringify(user));
  }

  getCurrentUser(): Empleados | null {
    if (!this.currentUserEmpleado) {
      const storedUser = localStorage.getItem('Empleado');
      this.currentUserEmpleado = storedUser ? JSON.parse(storedUser) as Empleados : null;
    }
    return this.currentUserEmpleado;
  }

  getTipoEmpleado(): Observable<TipoEmpleado[]> {
    return this.tipoEmpleadoService.listarTiposEmpleados();
  }

  getEmpleadoActual(): Observable<Empleados | null> {
    return this.http.get<Empleados>(`${this.apiEmpleadosUrl}/profile`).pipe(
      catchError(() => of(null))
    );
  }

  logout() {
    this.currentUserEmpleado = null;
    localStorage.removeItem('currentUserEmpleado');
    this.router.navigate(['/home']);
  }


}
