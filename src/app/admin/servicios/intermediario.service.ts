import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearIntermediarioDTO, IntermediarioDTO, LitarIntermediariosDTO } from '../intermediario/intermediario.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiURL=environment.apiURL+'/api';
  private _refresh$ = new Subject<void>();
  constructor(public http: HttpClient) { }

  public obtenerTodos():Observable<any>{
    return this.http.get<LitarIntermediariosDTO[]>(`${this.apiURL}/intermediarios`);
  }
  
  public crear(empresa: CrearIntermediarioDTO) {
    return this.http.post<boolean>(`${this.apiURL}/intermediarios`, empresa)  //envia el contenido del form al backend (web api)
    .pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public editar(id: number, empresa: CrearIntermediarioDTO){
    console.log(id);
    return this.http.put(`${this.apiURL}/intermediarios/${id}`, empresa).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public eliminarPorId(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/intermediarios/${id}`).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public obtenerEmpresaPorId(id: number):Observable<any>{
    return this.http.get<IntermediarioDTO>(`${this.apiURL}/intermediarios/${id}`);
  }
  //observables
  get refresh$(){
    return this._refresh$;
  }
}
