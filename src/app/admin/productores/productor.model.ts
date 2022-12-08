export interface CrearProductorDTO{
    nombre:string;
    apellido:string;
    cedula:string;
    celular:string;
    activo:string;
    fk_canton:string;
}

export interface LitarProductoresDTO{
  id: number ;
  nombre:string;
  apellido:string;
  cedula:string;
  celular:string;
  activo:string;
  fk_canton:string;
}
export interface ProductorDTO{
  id: number ;
  nombre:string;
    apellido:string;
    cedula:string;
    celular:string;
    activo:string;
    fk_canton:string;
}
export interface obtenerProductorDTO{
  name:string;
}