export interface CrearCostoProduccionDTO{
    nombre:string;
    latitud: number;
    longitud: number;
    activo: boolean;
}

export interface LitarCostoProduccionesDTO{
  id: number ;
  nombre:string ;
  latitud: number;
  longitud: number;
  activo: boolean;
}
export interface CostoProduccionDTO{
  id: number ;
  nombre:string ;
  latitud: number;
  longitud: number;
  activo: boolean;
}

export interface obtenerCostoProduccionDTO{
  id: number;
  name:string;
}

