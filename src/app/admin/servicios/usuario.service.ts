import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearUsuarioDTO, LitarUsuarioDTO, UsuarioDTO } from '../usuario/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiURL=environment.apiURL;
  private _refresh$ = new Subject<void>();
  constructor(public http: HttpClient) { }

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
