import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Clientes } from '../Modelos/clientes.modelo';

@Component({
  selector: 'app-inmueblesarriendo',
  templateUrl: './inmueblesarriendo.component.html',
  styleUrl: './inmueblesarriendo.component.css'
})
export class InmueblesarriendoComponent {
  currentUser: Clientes | null = null;
  constructor(private router: Router, private authService: AuthService) { 
    this.currentUser = this.authService.getCurrentUser();
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
