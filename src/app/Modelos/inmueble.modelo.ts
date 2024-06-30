import { Clientes } from "./clientes.modelo";
import { Empleados } from "./empleados.modelo";
import { Pagos } from "./pagos.modelo";
import { TipoInmueble } from "./tipoinmueble.modelo";

export class Inmueble {
    constructor(
        public idinmueble: number,
        public tipoinmueble: TipoInmueble,
        public tituloinmueble: String,
        public estado: String,
        public direccion: String,
        public descripcion: String,
        public habitaciones: number,
        public banos: number,
        public garajes: number,
        public estrato: number,
        public area: String,
        public propietario: Clientes,
        public foto: String,
        public pago: Pagos,
        public comercial: Empleados,  
    ) {}
}