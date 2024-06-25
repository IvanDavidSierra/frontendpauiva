import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Clientes } from '../Modelos/clientes.modelo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5';

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
  loginForm!: FormGroup;
  selectedForm: string = 'personaNatural';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  toggleForm(selectedForm: string) {
    this.selectedForm = selectedForm;
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

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        correo: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
  }
  
    login() {
      if (this.loginForm.valid) {
        const correoControl = this.loginForm.get('correo');
        const contraseñaControl = this.loginForm.get('password');
        if (correoControl && contraseñaControl) {
          const credentials = {
            correo: correoControl.value,
            password: contraseñaControl.value
          };
          this.authService.login(credentials).subscribe(
            response => {
              this.router.navigate(['/profile']);
            },
            error => {
              console.error(error);
              // Manejar el error en el inicio de sesión
            }
          );
        } else {
          console.error('Correo control not found in loginForm');
        }
      }
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
          this.router.navigate(['/profile']); // Redirigir al perfil después de registrar cliente
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

  registerPymes() {
    if (this.cliente.password.trim().toLowerCase() !== this.confirmPassword.trim().toLowerCase()) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    this.authService.registrarClientePymes(this.cliente)
      .subscribe(
        response => {
          console.log('Cliente registrado:', response);
          this.router.navigate(['/profile']); // Redirigir al perfil después de registrar cliente
        },
        error => {
          console.error('Error al registrar cliente:', error);
        }
      );
  }

  registerEmpresariales() {
    if (this.cliente.password.trim().toLowerCase() !== this.confirmPassword.trim().toLowerCase()) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    this.authService.registrarClienteEmpresariales(this.cliente)
      .subscribe(
        response => {
          console.log('Cliente registrado:', response);
          this.router.navigate(['/profile']); // Redirigir al perfil después de registrar cliente
        },
        error => {
          console.error('Error al registrar cliente:', error);
        }
      );
  }
}



