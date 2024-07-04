import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Clientes } from '../modelos/clientes.modelo';
import { AuthService } from '../auth.service';
import { Inmueble } from '../modelos/inmueble.modelo';
import { InmuebleService } from '../inmueble.service';
import { Empleados } from '../modelos/empleados.modelo';
import { AuthempleadoService } from '../authempleado.service';

@Component({
  selector: 'app-inmueblesventas',
  templateUrl: './inmueblesventas.component.html',
  styleUrl: './inmueblesventas.component.css'
})
export class InmueblesventasComponent {
  currentUser: Clientes | null = null;
  currentUserEmpleado: Empleados | null = null;
  inmuebles: Inmueble[] = [];

  constructor(private router: Router, private authService: AuthService,private inmuebleService: InmuebleService, private authEmpleadoService: AuthempleadoService) { 
    this.currentUser = this.authService.getCurrentUser();
    this.currentUserEmpleado = this.authEmpleadoService.getCurrentUser();
    this.inmuebleService.listar().subscribe(data => {
      this.inmuebles = data;
    });
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

  logout() {
    this.authService.logout();
    this.authEmpleadoService.logout();
    this.currentUser = null;
    this.currentUserEmpleado = null;
    this.router.navigate(['/home']);
  }
  
}
