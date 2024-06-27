import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Clientes } from '../Modelos/clientes.modelo';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: Clientes | null = null;
  tipoCliente: string = '';

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  navigateToAuthUsers() {
    this.router.navigate(['/authusers']);
  }

  irAInmueblesVentas() {
    this.router.navigate(['/inmueblesventas']);
  }

  entrarAInmueblesArriendo(){
    this.router.navigate(["/inmueblesarriendo"]);
  }

  logout() {
    this.authService.logout();
  }
}
