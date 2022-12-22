import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearUsuarioDTO, LitarUsuarioDTO, LoginUsuarioDTO, UsuarioDTO } from '../usuario/usuario.model';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiURL=environment.apiURL+'/auth';
  private _refresh$ = new Subject<void>();
  token: any;


 

  constructor(public http: HttpClient) { 
    this.cargarStorage()
  }

     //INICIALIZANDO AL LOCALSTORAGE
     cargarStorage() {
      if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
      } else {
        this.token = '';
      }
    }

    guardarDatosEnStorage(token: string) {
  //localStorage.setItem('id', id);
  localStorage.setItem('token', token);
  this.token = token;
}

    eliminarStorage() {
      this.token = '';
      localStorage.removeItem('token');
    }

  public obtenerTodos():Observable<any>{
    return this.http.get<LitarUsuarioDTO[]>(`${this.apiURL}/usuarios`);
  }
  
  public crear(usuario: CrearUsuarioDTO) {
    return this.http.post<boolean>(`${this.apiURL}/usuarios/`, usuario)  //envia el contenido del form al backend (web api)
    .pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }

  login(usuario: LoginUsuarioDTO) {

    return this.http.post(`${this.apiURL}/login/`, usuario).pipe(
      map((resp: any) => {
        console.log(resp)
        this.guardarDatosEnStorage(resp.token);
        return resp.token;
      }),
      catchError((err) => {
        return throwError(err.error.mensaje);
      })
    );
  }


  public editar(id: number, usuario: CrearUsuarioDTO){
    console.log('ID:'+id);
    return this.http.put(`${this.apiURL}/usuarios/${id}`, usuario).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public eliminarPorId(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/usuarios/${id}`).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public obtenerUsuarioPorId(id: number):Observable<any>{
    return this.http.get<UsuarioDTO>(`${this.apiURL}/usuarios/${id}`);
  }
  //observables
  get refresh$(){
    return this._refresh$;
  }
}
