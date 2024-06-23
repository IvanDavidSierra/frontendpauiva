import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Clientes } from '../Modelos/clientes.modelo';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-authusers',
  templateUrl: './authusers.component.html',
  styleUrls: ['./authusers.component.css']
})
export class AuthusersComponent implements OnInit {
  cliente: Clientes = {
    razon_social: '',
    nit: '',
    nombre: '',
    apellido: '',
    telefono: '',
    tipo_cliente: '',
    correo: '',
    password: ''
  };
  confirmPassword: string = '';
  errorRegistro: string = '';
  credentials: { correo: string; password: string } = {
    correo: '',
    password: ''
  };


  selectedForm: string = 'personaNatural';

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {
    this.loginForm = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }
  loginForm!: FormGroup;


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
    if (this.cliente.password.trim().toLowerCase() !== this.confirmPassword.trim().toLowerCase()) {
      this.errorRegistro = 'Las contraseñas no coinciden';
      return;
    }

    this.authService.registrarCliente(this.cliente)
      .subscribe(
        response => {
          console.log('Cliente registrado:', response);
          // Mostrar mensaje de éxito al usuario si es necesario
          this.errorRegistro = ''; // Limpiar el mensaje de error en caso de éxito
        },
        error => {
          console.error('Error al registrar cliente:', error);
          // Mostrar mensaje de error al usuario si es necesario
          if (error.error && error.error.message) {
            this.errorRegistro = error.error.message; // Asignar el mensaje de error del backend si está disponible
          } else {
            this.errorRegistro = 'Error al intentar registrar el cliente.';
          }
        }
      );
  }

  registerPymes(){
    if (this.cliente.password.trim().toLowerCase() !== this.confirmPassword.trim().toLowerCase()) {
      console.error('Las contraseñas no coinciden');
      return;
    }
    this.authService.registrarClientePymes(this.cliente)
      .subscribe(
        response => {
          console.log('Cliente registrado:', response);
          // Manejar la respuesta del servidor aquí, redirigir o mostrar mensajes según sea necesario
        },
        error => {
          console.error('Error al registrar cliente:', error);
          // Manejar errores de registro, mostrar mensajes de error al usuario si es necesario
        }
      );
  }

  registerEmpresariales(){
    if (this.cliente.password.trim().toLowerCase() !== this.confirmPassword.trim().toLowerCase()) {
      console.error('Las contraseñas no coinciden');
      return;
    }
    this.authService.registrarClienteEmpresariales(this.cliente)
      .subscribe(
        response => {
          console.log('Cliente registrado:', response);
          // Manejar la respuesta del servidor aquí, redirigir o mostrar mensajes según sea necesario
        },
        error => {
          console.error('Error al registrar cliente:', error);
        }
      );
  }

  
  login() {
    const correo = this.loginForm?.get('correo')?.value;
    const password = this.loginForm?.get('password')?.value;

    if (correo && password) {
      this.authService.loginCliente(correo, password)
        .subscribe(
          response => {
            console.log('Cliente logueado:', response);
            this.router.navigate(['/profile']);
          },
          error => {
            console.error('Error al iniciar sesión:', error);
          }
        );
    } else {
      console.error('Formulario de inicio de sesión no válido');
    }
  }
}


