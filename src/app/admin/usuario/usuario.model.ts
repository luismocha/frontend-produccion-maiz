  export interface CrearUsuarioDTO{
    usuario:string;
    correo: string;
    password: string;
}

export interface LitarUsuarioDTO{
  id: number ;
  usuario:string;
  correo: string;
  password: string;
}
export interface UsuarioDTO{
  id: number ;
  usuario:string;
  correo: string;
  password: string;
}

export interface obtenerUsuarioDTO{
  id: number;
  usuario:string;
}

export interface LoginUsuarioDTO{
  username: string;
  password:string;
}

