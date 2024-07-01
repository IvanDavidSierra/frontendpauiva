import { Component, OnInit } from '@angular/core';
import { Clientes } from '../Modelos/clientes.modelo';
import { Empleados } from '../Modelos/empleados.modelo';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthempleadoService } from '../authempleado.service';
import { InmuebleService } from '../inmueble.service';

@Component({
  selector: 'app-agregarinmueble',
  templateUrl: './agregarinmueble.component.html',
  styleUrl: './agregarinmueble.component.css'
})
export class AgregarinmuebleComponent implements OnInit {
  currentUser: Clientes | null = null;
  currentUserEmpleado: Empleados | null = null;
  tipoClientes: any[] = [];
  tipoClienteDescripcion: string = '';
  
  constructor(private authService: AuthService, private router: Router, private authEmpleadoService: AuthempleadoService, private inmuebleService: InmuebleService) { 
    this.currentUser = this.authService.getCurrentUser();
    this.currentUserEmpleado = this.authEmpleadoService.getCurrentUser();
  }

  ngOnInit(): void {
    console.log('Current User:', this.currentUser);
    console.log('Current empleado:', this.currentUserEmpleado);
  }

  entrarAInmueblesArriendo(){
    this.router.navigate(["/inmueblesarriendo"]);}

  navigateToAuthUsers() {
    this.router.navigate(['/authusers']);
  }
  irAInmueblesVentas()
  {
    this.router.navigate(['/inmueblesventas']);
  }
  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  irARegistrarInmueble(tipo: string){
    this.inmuebleService.setTipoInmueble(tipo);
    this.router.navigate(['registrarinmueble'])
  }

  logout() {
    this.authService.logout();
    this.currentUser = null;
    this.router.navigate(['/home']);
  }

}
