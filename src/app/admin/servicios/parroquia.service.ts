import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearParroquiaDTO, LitarParroquiasDTO, ParroquiaDTO } from '../parroquia/parroquia.model';

@Injectable({
  providedIn: 'root'
})
export class ParroquiaService {
  private apiURL=environment.apiURL;
  private _refresh$ = new Subject<void>();
  constructor(public http: HttpClient) { }

  public obtenerTodos():Observable<any>{
    return this.http.get<LitarParroquiasDTO[]>(`${this.apiURL}/parroquias`);
  }
  
  public crear(parroquia: CrearParroquiaDTO) {
    return this.http.post<boolean>(`${this.apiURL}/parroquias`, parroquia)  //envia el contenido del form al backend (web api)
    .pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public editar(id: number, parroquia: CrearParroquiaDTO){
    console.log(id);
    return this.http.put(`${this.apiURL}/parroquias/${id}`, parroquia).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public eliminarPorId(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/parroquia/${id}`).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public obtenerParroquiaPorId(id: number):Observable<any>{
    return this.http.get<ParroquiaDTO>(`${this.apiURL}/parroquias/${id}`);
  }
  //observables
  get refresh$(){
    return this._refresh$;
  }
}
