import { TipoEmpleado } from "./tipoempleado.modelo";

export class Empleados {
    constructor(
      public idempleado: number,
      public nombre: string,
      public apellido: string,
      public tipoEmpleado: TipoEmpleado,
      public oficina: number,
      public correo: string,
      public telefono: string,
    ) {}
}