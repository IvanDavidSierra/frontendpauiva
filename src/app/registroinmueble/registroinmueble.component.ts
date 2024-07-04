import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { InmuebleService } from '../inmueble.service';
import { Clientes } from '../modelos/clientes.modelo';
import { Inmueble } from '../modelos/inmueble.modelo';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Empleados } from '../modelos/empleados.modelo';
import { AuthempleadoService } from '../authempleado.service';
import { TipoInmueble } from '../modelos/tipoinmueble.modelo';

@Component({
  selector: 'app-registroinmueble',
  templateUrl: './registroinmueble.component.html',
  styleUrl: './registroinmueble.component.css'
})
export class RegistroinmuebleComponent implements OnInit {
  inmueble: Inmueble | undefined;
  currentUser: Clientes | null = null;
  selectedTipoInmuebleId: number | null = null;
  empleados: Empleados[] = [];
  tipoInmuebles: TipoInmueble[] = [];

  tipoInmuebleDescripcion: string = '';
  selectedFile: File | null = null;
  currentUserEmpleado: Empleados | null = null;


  /*Campos formulario*/
  tituloinmueble: string = '';
  estadoinmueble: string = 'Selecciona estado para el inmueble';
  tipoinmueble: string = '';
  habitaciones: number | undefined;
  banos: number | undefined;
  garaje: number | undefined;
  estrato: number | undefined;
  area: string = '';
  comercial: number | undefined;
  descripcion: string = '';
  foto: string = '';
  /* termina aca */

  constructor(private router: Router, private authService: AuthService,private inmuebleService: InmuebleService, private route: ActivatedRoute,private fb: FormBuilder, public empleadosService: AuthempleadoService, private authEmpleadoService: AuthempleadoService) {
    this.currentUser = this.authService.getCurrentUser();
    this.currentUserEmpleado = this.authEmpleadoService.getCurrentUser();
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
    this.route.paramMap.subscribe(params => {
      const descripcion = params.get('descripcion');
      const idtipoinmueble = params.get('id');
      if (descripcion !== null) {
        this.tipoInmuebleDescripcion = descripcion;
      }
      if (idtipoinmueble !== null){
        this.selectedTipoInmuebleId = +idtipoinmueble;
      }
    });
      this.empleadosService.obtenerEmpleados().subscribe(data => {
        this.empleados = data;
      });

    this.tipoInmuebles = [
        { idtipoinmueble: 1, descripcioninmueble: 'Casa' },
        { idtipoinmueble: 2, descripcioninmueble: 'Apartamento' },
        { idtipoinmueble: 3, descripcioninmueble: 'Lote' }
      ];



  }

  submitForm() {
    const nuevoInmueble = {
      tituloinmueble: this.tituloinmueble,
      estado: this.estadoinmueble,
      tipoinmueble: { idtipoinmueble: this.selectedTipoInmuebleId },
      habitaciones: this.habitaciones,
      banos: this.banos,
      garajes: this.garaje,
      estrato: this.estrato,
      area: this.area,
      comercial: {idempleado: this.comercial},
      descripcion: this.descripcion,
      foto: 'inmueble-destacada1.jpg',
      propietario: {idcliente: this.currentUser?.idcliente}
    };

    this.inmuebleService.agregarInmueble(nuevoInmueble).subscribe(
      (response) => {
        console.log('Inmueble agregado correctamente', response);
        alert('¡Inmueble agregado correctamente!')
        const idInmuebleCreado = response.idinmueble;
        this.router.navigate([`/inmueble/${idInmuebleCreado}`]);
        // Aquí podrías agregar lógica adicional, como redirigir a una página de confirmación
      },
      (error) => {
        console.error('Error al agregar inmueble', error);
        // Manejo de errores
      }
    );


  }
  obtenerEmpleados() {
    this.empleadosService.obtenerEmpleados().subscribe(
        data => {
            this.empleados = data;
        },
        error => {
            console.error('Error al obtener empleados:', error);
        }
    );
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
    this.authEmpleadoService.logout();
    this.currentUser = null;
    this.currentUserEmpleado = null;
    this.router.navigate(['/home']);
  }
}
