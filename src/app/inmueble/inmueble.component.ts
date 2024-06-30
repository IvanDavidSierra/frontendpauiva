import { Component } from '@angular/core';
import { Inmueble } from '../Modelos/inmueble.modelo';
import { InmuebleService } from '../inmueble.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Clientes } from '../Modelos/clientes.modelo';

@Component({
  selector: 'app-inmueble',
  templateUrl: './inmueble.component.html',
  styleUrl: './inmueble.component.css'
})
export class InmuebleComponent {
  inmueble: Inmueble | undefined;
  currentUser: Clientes | null = null;
  constructor(private inmuebleService: InmuebleService, private router: Router,private authService: AuthService, private route: ActivatedRoute ) {
    this.currentUser = this.authService.getCurrentUser();
    this.getInmueble();
  }

  getInmueble(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.inmuebleService.listarId(id).subscribe(
      inmueble => {
        console.log('Datos del inmueble:', inmueble);
        this.inmueble = inmueble;
      },
      error => {
        console.error('Error fetching inmueble:', error);
      }
    );
  }

  navigateToAuthUsers() {
    this.router.navigate(['/authusers']);
  }
  entrarAInmueblesArriendo(){
    this.router.navigate(["/inmueblesarriendo"]);
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
