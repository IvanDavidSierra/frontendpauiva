import { Component } from '@angular/core';
import { Clientes } from '../modelos/clientes.modelo';
import { Empleados } from '../modelos/empleados.modelo';
import { Inmueble } from '../modelos/inmueble.modelo';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { InmuebleService } from '../inmueble.service';
import { AuthempleadoService } from '../authempleado.service';
import { ClientesService } from '../clientes.service';
import { TipoInmueble } from '../modelos/tipoinmueble.modelo';
import { TipoCliente } from '../modelos/tipocliente.modelo';
import { Pagos } from '../modelos/pagos.modelo';
import { TipoPago } from '../modelos/tipopago.modelo';
import { TipoEmpleado } from '../modelos/tipoempleado.modelo';

@Component({
  selector: 'app-menuadmin',
  templateUrl: './menuadmin.component.html',
  styleUrl: './menuadmin.component.css'
})
export class MenuadminComponent {
  currentUser: Clientes | null = null;
  currentUserEmpleado: Empleados | null = null;
  inmuebles: Inmueble[] = [];
  selectedTable: string = 'inmuebles';
  clientes: Clientes[] = [];
  selectedInmueble: Inmueble;
  selectedCliente: Clientes;

  constructor(private router: Router, private authService: AuthService,private inmuebleService: InmuebleService, private authEmpleadoService: AuthempleadoService, private clienteService:ClientesService) {
    this.currentUser = this.authService.getCurrentUser();
    this.currentUserEmpleado = this.authEmpleadoService.getCurrentUser();
    
    this.clienteService.listar().subscribe(data =>{
      this.clientes = data;
    })
    
    this.inmuebleService.listar().subscribe(data => {
      this.inmuebles = data;
    });
    

    this.selectedInmueble = new Inmueble(
      0, // idinmueble
      new TipoInmueble(0, ''), // tipoinmueble
      '', // tituloinmueble
      '', // estado
      '', // direccion
      '', // descripcion
      0, // habitaciones
      0, // banos
      0, // garajes
      0, // estrato
      '', // area
      new Clientes(0, '', '', new TipoCliente(0,''), '', '', '',''), // propietario
      '', // foto
      new Pagos(0, new TipoPago(0,''),'','',new Clientes(0, '', '', new TipoCliente(0,''), '', '', '','')), // pago
      new Empleados(0, '', '', new TipoEmpleado(0,''), 0, '', ''), // comercial
      '' // valor
    );

    this.selectedCliente = new Clientes(
      0,
      '', // nombre
      '', // apellido
      new TipoCliente(0,''), // tipocliente
      '', // telefono
      '', // correo
      '', // correo
      '', // razon_social
    )
  }



  seleccionarInmueble(inmueble: Inmueble): void {
    this.selectedInmueble = { ...inmueble }; 
  }

  seleccionarCliente(cliente: Clientes): void{
    this.selectedCliente = { ...cliente }; 
  }

  editarClientes(): void {
    if(this.selectedCliente){
      this.clienteService.editar(this.selectedCliente.idcliente,this.selectedCliente).subscribe(() => {
        this.clienteService.listar();
        alert('Cliente actualizado');
        window.location.reload();
      });
    }
  }

  editarInmueble(): void {
    if (this.selectedInmueble) {
      this.inmuebleService.update(this.selectedInmueble.idinmueble, this.selectedInmueble).subscribe(() => {
        this.inmuebleService.listar();
        alert('Inmueble actualizado');
        window.location.reload();
      });
    }
  }

  eliminarCliente(id: number): void {
    this.clienteService.delete(id).subscribe(
      () => {
        console.log('Cliente eliminado correctamente');
        this.clienteService.listar().subscribe(
          data => {
            this.clientes = data;
            alert('Cliente eliminado');
          },
          error => {
            console.error('Error al obtener la lista de clientes después de eliminar:', error);
          }
        );
      },
      error => {
        console.error('Error al eliminar cliente:', error);
      }
    );
  }

  eliminarInmueble(id:number):void{
    this.inmuebleService.delete(id).subscribe(
      () => {
        console.log('Cliente eliminado correctamente');
        this.inmuebleService.listar().subscribe(
          data => {
            this.inmuebles = data;
            alert('Inmueble eliminado');
          },
          error => {
            console.error('Error al obtener la lista de inmuebles después de eliminar:', error);
          }
        );
      },
      error => {
        console.error('Error al eliminar inmueble:', error);
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

  selectTable(table: string) {
    this.selectedTable = table;
  }

  logout() {
    this.authService.logout();
    this.authEmpleadoService.logout();
    this.currentUser = null;
    this.currentUserEmpleado = null;
    this.router.navigate(['/home']);
  }

}
