import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Clientes } from '../Modelos/clientes.modelo';
import { FormGroup, FormBuilder} from '@angular/forms';
import { TipoCliente } from '../Modelos/tipocliente.modelo';

interface LoginCliente {
  correo: string;
}

@Component({
  selector: 'app-authusers',
  templateUrl: './authusers.component.html',
  styleUrls: ['./authusers.component.css']
})
export class AuthusersComponent{
  loginCliente: LoginCliente = { correo: ''};
  
  clienteNatural: Clientes = {
    razon_social: '',
    nit: '',
    nombre: '',
    apellido: '',
    telefono: '',
    tipoCliente: new TipoCliente(1, 'Persona Natural'),
    correo: '',
  };

  clientePymes: Clientes = {
    razon_social: '',
    nit: '',
    nombre: '',
    apellido: '',
    telefono: '',
    tipoCliente: new TipoCliente(2, 'Pymes'),
    correo: '',
  };

  clienteEmpresarial: Clientes = {
    razon_social: '',
    nit: '',
    nombre: '',
    apellido: '',
    telefono: '',
    tipoCliente: new TipoCliente(3, 'Empresariales'),
    correo: '',
  };


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

  login() {
    if (!this.loginCliente.correo) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    this.authService.login(this.loginCliente.correo).subscribe(
      (response: Clientes) => {
        this.authService.setCurrentUser(response);
        this.router.navigate(['/profile']);
      },
      error => {
        alert('Login failed');
      }
    );
  }


  register() {
    if (!this.clienteNatural.nombre || !this.clienteNatural.apellido || !this.clienteNatural.correo || !this.clienteNatural.telefono ) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    this.authService.registrarCliente(this.clienteNatural)
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
    this.authService.registrarClientePymes(this.clientePymes)
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

    this.authService.registrarClienteEmpresariales(this.clienteEmpresarial)
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



