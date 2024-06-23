import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthusersComponent } from './authusers/authusers.component';
import { HomeComponent } from './home/home.component';
import { InmueblesventasComponent } from './inmueblesventas/inmueblesventas.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'authusers', component: AuthusersComponent },
  { path: 'inmueblesventas', component: InmueblesventasComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
