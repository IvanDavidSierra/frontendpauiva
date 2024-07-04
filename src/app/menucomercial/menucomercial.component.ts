import { Component } from '@angular/core';
import { Clientes } from '../modelos/clientes.modelo';
import { Inmueble } from '../modelos/inmueble.modelo';
import { Empleados } from '../modelos/empleados.modelo';
import { InmuebleService } from '../inmueble.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthempleadoService } from '../authempleado.service';

@Component({
  selector: 'app-menucomercial',
  templateUrl: './menucomercial.component.html',
  styleUrl: './menucomercial.component.css'
})
export class MenucomercialComponent {
  inmuebles: Inmueble[] = [];
  currentUser: Clientes | null = null;
  currentUserEmpleado: Empleados | null = null;
  selectedTable: string = 'inmuebles';
  showInmuebles: boolean = true; 
  showCitas: boolean = false;
  showOpiniones: boolean = false;
  constructor(private router: Router,private authService: AuthService, private authEmpleadoService: AuthempleadoService) {
    this.currentUser = this.authService.getCurrentUser();
    this.currentUserEmpleado = this.authEmpleadoService.getCurrentUser();

  }

  entrarAInmueblesArriendo(){
    this.router.navigate(["/inmueblesarriendo"]);}

  navigateToAuthUsers() {
    this.router.navigate(['/authusers']);
  }
  irAInmueblesVentas(){
    this.router.navigate(['/inmueblesventas']);
  }
  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  selectTable(option: string): void {
    this.showInmuebles = option === 'inmuebles';
    this.showCitas = option === 'citas';
    this.showOpiniones = option === 'opiniones';
  }

  logout() {
    this.authService.logout();
    this.authEmpleadoService.logout();
    this.currentUser = null;
    this.currentUserEmpleado = null;
    this.router.navigate(['/home']);
  }
}
