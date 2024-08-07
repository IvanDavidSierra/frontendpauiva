import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Clientes } from '../modelos/clientes.modelo';
import { InmuebleService } from '../inmueble.service';
import { Inmueble } from '../modelos/inmueble.modelo';
import { Empleados } from '../modelos/empleados.modelo';
import { AuthempleadoService } from '../authempleado.service';

@Component({
  selector: 'app-inmueblesarriendo',
  templateUrl: './inmueblesarriendo.component.html',
  styleUrl: './inmueblesarriendo.component.css'
})
export class InmueblesarriendoComponent {
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
