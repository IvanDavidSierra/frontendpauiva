import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthusersComponent } from './authusers/authusers.component';
import { HomeComponent } from './home/home.component';
import { InmueblesventasComponent } from './inmueblesventas/inmueblesventas.component';
import { ProfileComponent } from './profile/profile.component';
import { InmueblesarriendoComponent } from './inmueblesarriendo/inmueblesarriendo.component';
import { AgregarinmuebleComponent } from './agregarinmueble/agregarinmueble.component';
import { InmuebleComponent } from './inmueble/inmueble.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'authusers', component: AuthusersComponent },
  { path: 'inmueblesventas', component: InmueblesventasComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'inmueblesarriendo', component: InmueblesarriendoComponent},
  { path: 'agregarinmueble' , component: AgregarinmuebleComponent},
  { path: 'inmueble/:id', component: InmuebleComponent},
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
