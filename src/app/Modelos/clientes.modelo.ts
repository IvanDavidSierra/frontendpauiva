import { TipoCliente } from "./tipocliente.modelo";

export class Clientes {
    constructor(
      public nombre: string,
      public apellido: string,
      public tipoCliente: TipoCliente,
      public telefono: string,
      public correo: string,
      public razon_social: string,
      public nit: string
    ) {}
}