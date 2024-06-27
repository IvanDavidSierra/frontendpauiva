import { TipoEmpleado } from "./tipoempleado.modelo";

export class Empleados {
    constructor(
      public nombre: string,
      public apellido: string,
      public tipoEmpleado: TipoEmpleado,
      public oficina: string,
      public correo: string,
      public comisiones: string,
    ) {}
}