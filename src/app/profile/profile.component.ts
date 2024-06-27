import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Clientes } from '../Modelos/clientes.modelo';
import { Router } from '@angular/router';
import { TipoClienteService } from '../tipo-cliente.service';
import { TipoCliente } from '../Modelos/tipocliente.modelo';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: Clientes | null = null;
  tipoClientes: any[] = [];
  tipoClienteDescripcion: string = '';
  
  constructor(private authService: AuthService, private router: Router) { 
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    console.log('Current User:', this.currentUser);
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

  logout() {
    this.authService.logout();
    this.currentUser = null;
    this.router.navigate(['/home']);
  }
}
