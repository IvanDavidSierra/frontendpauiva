// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Clientes } from '../Modelos/clientes.modelo';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  cliente: Clientes | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getClienteActual()
      .subscribe(
        (cliente: Clientes | null) => {
          this.cliente = cliente;
          if (!cliente) {
            this.router.navigate(['/authusers']);
          }
        },
        (error: any) => {
          console.error('Error al obtener el cliente actual:', error);
        }
      );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/authusers']);
  }
}
