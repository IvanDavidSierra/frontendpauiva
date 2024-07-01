import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Clientes } from '../Modelos/clientes.modelo';
import { Router } from '@angular/router';
import { Empleados } from '../Modelos/empleados.modelo';
import { AuthempleadoService } from '../authempleado.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: Clientes | null = null;
  currentUserEmpleado: Empleados | null = null;
  tipoClientes: any[] = [];
  tipoClienteDescripcion: string = '';
  
  constructor(private authService: AuthService, private router: Router, private authEmpleadoService: AuthempleadoService) { 
    this.currentUser = this.authService.getCurrentUser();
    this.currentUserEmpleado = this.authEmpleadoService.getCurrentUser();
  }

  ngOnInit(): void {
    console.log('Current User:', this.currentUser);
    console.log('Current empleado:', this.currentUserEmpleado);
  }


  navigateToAuthUsers() {
    this.router.navigate(['/authusers']);
  }

  irAInmueblesVentas() {
    this.router.navigate(['/inmueblesventas']);
  }

  entrarAInmueblesArriendo() {
    this.router.navigate(["/inmueblesarriendo"]);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  ingresarASubirInmueble(){
    this.router.navigate(['agregarinmueble']);
  }

  logout() {
    this.authService.logout();
    this.currentUser = null;
    this.router.navigate(['/home']);
  }
}
