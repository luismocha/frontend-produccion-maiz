export interface CrearParroquiaDTO{
    nombre:string;
    fk_canton: number;
    activo: boolean;
}

export interface LitarParroquiasDTO{
  id: number ;
  nombre:string ;
  fk_canton: number;
  activo: boolean;
}
export interface ParroquiaDTO{
  id: number ;
  nombre:string ;
  fk_canton: number;
  activo: boolean;
}