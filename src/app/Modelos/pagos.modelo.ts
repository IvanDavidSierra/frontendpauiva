import { Clientes } from "./clientes.modelo";
import { TipoPago } from "./tipopago.modelo";

export class Pagos{
    constructor(
        public idpagos: number,
        public tipopago: TipoPago,
        public consignacion: String,
        public descripcion: String,
        public cliente: Clientes
    ){}
}