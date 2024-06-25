import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inmueblesarriendo',
  templateUrl: './inmueblesarriendo.component.html',
  styleUrl: './inmueblesarriendo.component.css'
})
export class InmueblesarriendoComponent {
  constructor(private router: Router) { }
  entrarAInmueblesArriendo(){
    this.router.navigate(["/inmueblesarriendo"]);}

  navigateToAuthUsers() {
    this.router.navigate(['/authusers']);
  }
  irAInmueblesVentas(){
    this.router.navigate(['/inmueblesventas']);
  }
}
