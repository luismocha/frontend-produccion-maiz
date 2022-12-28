import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearLugarDTO, LitarLugaresDTO, LugarDTO } from '../lugar/lugar.model';

@Injectable({
  providedIn: 'root'
})
export class LugarService {
  private apiURL=environment.apiURL+'/api';
  private _refresh$ = new Subject<void>();
  constructor(public http: HttpClient) { }

  token: any = localStorage.getItem('token');

  httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization':`Token ${this.token}`
   })
 };


  public obtenerTodos():Observable<any>{
    return this.http.get<LitarLugaresDTO[]>(`${this.apiURL}/lugares`, this.httpOptions);
  }
  
  public crear(lugar: CrearLugarDTO) {
    return this.http.post<boolean>(`${this.apiURL}/lugares/`, lugar, this.httpOptions)  //envia el contenido del form al backend (web api)
    .pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public editar(id: number, lugar: CrearLugarDTO){
    console.log('ID:'+id);
    return this.http.put(`${this.apiURL}/lugares/${id}`, lugar, this.httpOptions).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public eliminarPorId(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/lugares/${id}`).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public obtenerLugarPorId(id: number):Observable<any>{
    return this.http.get<LugarDTO>(`${this.apiURL}/lugares/${id}`);
  }
  //observables
  get refresh$(){
    return this._refresh$;
  }


}
