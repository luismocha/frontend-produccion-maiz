
export class ProductosModel{
    id?: number ;
    id_genero?: number;
    id_proveedor?: number;
    precio?: number;
    url_descarga?:string ;
    url_directorio?: string;
    estado?: number;
    tipo_archivo?: number;
    fecha_producto?: string;
    genero?:string;
    caratula?:string = '../../assets/images/WhatsApp Image 2022-10-07 at 7.20.00 PM.jpeg';
    apodo?:string;
    img?:string;
    created_at?:string;
    updated_at?:string;
  }