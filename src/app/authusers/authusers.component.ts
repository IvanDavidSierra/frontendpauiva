import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-authusers',
  templateUrl: './authusers.component.html',
  styleUrls: ['./authusers.component.css']
})
export class AuthusersComponent {
  cliente: any = {
    nombre: '',
    apellido: '',
    correo: '',
    contraseña: '',
    confirmPassword: ''
  };

  credentials: any = {
    correo: '',
    contraseña: ''
  };
  selectedForm: string = 'personaNatural'; 

  constructor(private router: Router, private authService: AuthService) {}

  navigateToAuthUsers() {
    this.router.navigate(['/authusers']);
  }

  irAInmueblesVentas() {
    this.router.navigate(['/inmueblesventas']);
  }

  toggleForm(selectedForm: string) {
    this.selectedForm = selectedForm;
  }

  register() {
    this.authService.registrarCliente(this.cliente)
      .subscribe(
        response => {
          console.log('Cliente registrado:', response);
          // Aquí puedes manejar la respuesta del backend, por ejemplo, mostrar un mensaje de éxito
        },
        error => {
          console.error('Error al registrar cliente:', error);
          // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        }
      );
  }

  login() {
    this.authService.loginCliente(this.credentials.correo, this.credentials.contraseña)
      .subscribe(
        response => {
          console.log('Cliente logueado:', response);
        },
        error => {
          console.error('Error al iniciar sesión:', error);
        }
      );
  }
}


