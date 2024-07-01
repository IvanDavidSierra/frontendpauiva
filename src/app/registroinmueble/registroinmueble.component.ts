import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { InmuebleService } from '../inmueble.service';
import { Clientes } from '../Modelos/clientes.modelo';
import { Inmueble } from '../Modelos/inmueble.modelo';

@Component({
  selector: 'app-registroinmueble',
  templateUrl: './registroinmueble.component.html',
  styleUrl: './registroinmueble.component.css'
})
export class RegistroinmuebleComponent implements OnInit {
  inmueble: Inmueble | undefined;
  currentUser: Clientes | null = null;
  tipoInmueble: string = '';

  constructor(private router: Router, private authService: AuthService,private inmuebleService: InmuebleService, private route: ActivatedRoute) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.tipoInmueble = this.inmuebleService.getTipoInmueble();
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
    this.currentUser = null;
    this.router.navigate(['/home']);
  }
}
