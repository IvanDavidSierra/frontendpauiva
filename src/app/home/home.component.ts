import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Clientes } from '../Modelos/clientes.modelo';
import { Inmueble } from '../Modelos/inmueble.modelo';
import { InmuebleService } from '../inmueble.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentUser: Clientes | null = null;
  inmuebles: Inmueble[] = [];
  inmueblesAleatorios: Inmueble[] = [];


  constructor(private router: Router, private authService: AuthService,private inmuebleService: InmuebleService) {
    this.currentUser = this.authService.getCurrentUser();
    this.inmuebleService.listar().subscribe(data => {
      this.inmuebles = data;
      this.inmueblesAleatorios = this.getRandomInmuebles(this.inmuebles, 3);
    });
   }

  getRandomInmuebles(arr: Inmueble[], num: number): Inmueble[] {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
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
