import { LugarDTO } from "../lugar/lugar.model";
import { ProductorDTO } from "../productores/productor.model";

export interface CrearIntermediarioDTO{
    year_compra:number;
    cantidad_comprada: number;
    activo: boolean;
    fk_lugar_id: number;
    produccion: number;
}

export interface LitarIntermediariosDTO{
  id: number ;
  year_compra:number;
  cantidad_comprada: number;
  activo: boolean;
  fk_lugar: LugarDTO;
}
export interface IntermediarioDTO{
  id: number ;
  year_compra:number;
  cantidad_comprada: number;
  activo: boolean;
  fk_lugar: LugarDTO;
}


