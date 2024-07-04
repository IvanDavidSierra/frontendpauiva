import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Clientes } from '../modelos/clientes.modelo';
import { Router } from '@angular/router';
import { Empleados } from '../modelos/empleados.modelo';
import { AuthempleadoService } from '../authempleado.service';
import { Inmueble } from '../modelos/inmueble.modelo';
import { InmuebleService } from '../inmueble.service';



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
  tipoEmpleadoDescripcion: string = '';
  inmuebles: Inmueble[] = [];
  
  constructor(private authService: AuthService, private router: Router, private authEmpleadoService: AuthempleadoService, private inmuebleService: InmuebleService) { 
    console.log('Current User:', this.currentUser);
    console.log('Current Empleado:', this.currentUserEmpleado);
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.currentUserEmpleado = this.authEmpleadoService.getCurrentUser();
    this.inmuebleService.listar().subscribe(data => {
      if (this.currentUser?.idcliente) {
        this.inmuebles = data.filter(inmueble => inmueble.propietario.idcliente === this.currentUser?.idcliente);
      } else {
        this.inmuebles = data;
      }
    });
    console.log('Current User:', this.currentUser);
    console.log('Current Empleado:', this.currentUserEmpleado);
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

  ingresarAMenuAdmin(){
    this.router.navigate(['menuadmin']);
  }

  ingresarAMenuComercial(){
    this.router.navigate(['menucomercial']);
  }

  logout() {
    this.authService.logout();
    this.authEmpleadoService.logout();
    this.currentUser = null;
    this.currentUserEmpleado = null;
    this.router.navigate(['/home']);

  }
}
