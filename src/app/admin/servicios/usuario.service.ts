import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearUsuarioDTO, LitarUsuarioDTO, LoginUsuarioDTO, UsuarioDTO } from '../usuario/usuario.model';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiURL=environment.apiURL+'/auth';
  private _refresh$ = new Subject<void>();
  token: any;

  tokenObtenido: any = localStorage.getItem('token');
 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Token ${this.tokenObtenido}`
    })
  };

  constructor(public http: HttpClient, private router: Router) { 
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
  logout() {

    return this.http.post(`${this.apiURL}/logout/`, this.httpOptions).pipe(
      map((resp: any) => {
        localStorage.removeItem('token');
        this.router.navigate(['/principal']);
        return resp.success;
      }),
      catchError((err) => {
        //this.router.navigate(['/auth/login']);
        return throwError(err);
      })
    );
  }

  public obtenerTodos():Observable<any>{
    return this.http.get<LitarUsuarioDTO[]>(`${this.apiURL}/users`);
  }
  
  public crear(usuario: CrearUsuarioDTO) {
    return this.http.post<boolean>(`${this.apiURL}/register/`, usuario, this.httpOptions)  //envia el contenido del form al backend (web api)
    .pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }

  public editar(id: number, usuario: CrearUsuarioDTO){
    console.log('ID:'+id);
    return this.http.put(`${this.apiURL}/users/${id}`, usuario).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public eliminarPorId(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/users/${id}`).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public obtenerUsuarioPorId(id: number):Observable<any>{
    return this.http.get<UsuarioDTO>(`${this.apiURL}/users/${id}`);
  }
  //observables
  get refresh$(){
    return this._refresh$;
  }
}