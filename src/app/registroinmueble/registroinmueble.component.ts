import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { InmuebleService } from '../inmueble.service';
import { Clientes } from '../Modelos/clientes.modelo';
import { Inmueble } from '../Modelos/inmueble.modelo';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Empleados } from '../Modelos/empleados.modelo';
import { AuthempleadoService } from '../authempleado.service';
import { TipoInmueble } from '../Modelos/tipoinmueble.modelo';
import { UploadfileService } from '../uploadfile.service';

@Component({
  selector: 'app-registroinmueble',
  templateUrl: './registroinmueble.component.html',
  styleUrl: './registroinmueble.component.css'
})
export class RegistroinmuebleComponent implements OnInit {
  inmueble: Inmueble | undefined;
  currentUser: Clientes | null = null;
  comerciales: Empleados | null = null;
  selectedTipoInmuebleId: number | null = null;
  registerForm: FormGroup;
  empleados: Empleados[] = [];
  tipoInmuebles: TipoInmueble[] = [];
  tipoInmuebleDescripcion: string = '';
  selectedFile: File | null = null;

  constructor(private router: Router, private authService: AuthService,private inmuebleService: InmuebleService, private route: ActivatedRoute,private fb: FormBuilder, public empleadosService: AuthempleadoService, private uploadService: UploadfileService) {
    this.currentUser = this.authService.getCurrentUser();
    this.registerForm = this.fb.group({
      /*idinmueble: [''],*/
      tipoinmueble: this.selectedTipoInmuebleId,
      tituloinmueble: [''],
      estado: [''],
      direccion: [''],
      descripcion: [''],
      habitaciones: [''],
      banos: [''],
      garajes: [''],
      estrato: [''],
      area: [''],
      propietario: [this.currentUser?.idcliente],
      foto: [''],
      comercial: ['']
    });
  }

  ngOnInit(): void {
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
    this.inmuebleService.listarTipoInmueble().subscribe(data => {
        this.tipoInmuebles = data;
        if (this.selectedTipoInmuebleId) {
          this.registerForm.patchValue({ tipoinmueble: this.selectedTipoInmuebleId });
        }
      });

      this.empleadosService.obtenerEmpleados().subscribe(data => {
        this.empleados = data;
      });
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }


  async onSubmit(): Promise<void> {
    if (this.registerForm.valid && this.selectedFile) {
      try {
        const formData = this.registerForm.value;
        formData.tipoinmueble = this.tipoInmuebles.find(ti => ti.idtipoinmueble === formData.tipoinmueble);
        formData.propietario = this.currentUser?.idcliente;
        formData.comercial = this.registerForm.get('comercial')?.value;
  
        // Obtener el ID del comercial y propietario seleccionados
        const comercialId = formData.comercial;
        const propietarioId = formData.propietario; // Asegúrate de que propietarioId sea del tipo number
  
        console.log('formData:', formData); // Verifica que formData contenga propietario con el ID esperado
  
        await this.uploadService.uploadFile(this.selectedFile, formData, comercialId, propietarioId);
        console.log('Inmueble registrado correctamente.');
      } catch (error) {
        console.error('Error al registrar inmueble:', error);
      }
    }
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
    this.currentUser = null;
    this.router.navigate(['/home']);
  }
}
