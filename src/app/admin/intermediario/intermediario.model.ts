import { ProductorDTO } from "../productores/productor.model";

export interface CrearIntermediarioDTO{
    id: number ;
    year:number;
    cantidad: number;
    fk_productor: number;
    fk_lugar: number;
}

export interface LitarIntermediariosDTO{
  id: number ;
  year:number;
  cantidad: number;
  fk_productor: number;
  fk_lugar: number;
}
export interface IntermediarioDTO{
    id: number ;
    year:number;
    cantidad: number;
    fk_productor: number;
    fk_lugar: number;
}


