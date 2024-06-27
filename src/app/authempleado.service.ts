import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TipoEmpleadoService } from './tipo-empleado.service';
import { Observable, catchError, of } from 'rxjs';
import { Empleados } from './Modelos/empleados.modelo';
import { TipoEmpleado } from './Modelos/tipoempleado.modelo';

@Injectable({
  providedIn: 'root'
})
export class AuthempleadoService {
  private apiEmpleadosUrl = 'http://localhost:8080/empleados'
  private currentUser: Empleados | null = null;
  constructor(private http: HttpClient, private router: Router,private tipoEmpleadoService: TipoEmpleadoService) { }

  
  loginEmpleados(correo: string): Observable<Empleados> {
    return this.http.post<Empleados>(`${this.apiEmpleadosUrl}/login`, { correo })
  }

  setCurrentUser(user: Empleados) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): Empleados | null {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      this.currentUser = storedUser ? JSON.parse(storedUser) as Empleados : null;
    }
    return this.currentUser;
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
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }


}
