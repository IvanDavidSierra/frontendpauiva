import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthusersComponent } from './authusers/authusers.component';
import { InmueblesventasComponent } from './inmueblesventas/inmueblesventas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { InmueblesarriendoComponent } from './inmueblesarriendo/inmueblesarriendo.component';
import { AgregarinmuebleComponent } from './agregarinmueble/agregarinmueble.component';
import { InmuebleComponent } from './inmueble/inmueble.component';
import { RegistroinmuebleComponent } from './registroinmueble/registroinmueble.component';
import { MenuadminComponent } from './menuadmin/menuadmin.component';
import { MenucomercialComponent } from './menucomercial/menucomercial.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthusersComponent,
    InmueblesventasComponent,
    ProfileComponent,
    InmueblesarriendoComponent,
    InmuebleComponent,
    AgregarinmuebleComponent,
    RegistroinmuebleComponent,
    MenuadminComponent,
    MenucomercialComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
