export interface CrearProductorDTO{
    nombre:string;
    apellido:string;
    cedula:string;
    celular:string;
    activo:string;
    fk_canton:number;
    fk_parroquia:number;
}

export interface LitarProductoresDTO{
  id: number ;
  nombre:string;
  apellido:string;
  cedula:string;
  celular:string;
  activo:string;
  fk_canton:number;
  fk_parroquia:number;
}
export interface ProductorDTO{
  id: number ;
  nombre:string;
  apellido:string;
  cedula:string;
  celular:string;
  activo:string;
  fk_canton:number;
  fk_parroquia:number;
}
export interface obtenerProductorDTO{
  name:string;
}


export interface combiarCantonParroquiaProductorDTO{
  id: number ;
  nombre:string;
  apellido:string;
  cedula:string;
  celular:string;
  activo:string;
  canton:string;
  parroquia:string;
}