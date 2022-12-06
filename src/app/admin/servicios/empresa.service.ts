import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearEmpresaDTO, EmpresaDTO, LitarEmpresasDTO } from '../empresa/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiURL=environment.apiURL;
  private _refresh$ = new Subject<void>();
  constructor(public http: HttpClient) { }

  public obtenerTodos():Observable<any>{
    return this.http.get<LitarEmpresasDTO[]>(`${this.apiURL}/empresas`);
  }
  
  public crear(empresa: CrearEmpresaDTO) {
    return this.http.post<boolean>(`${this.apiURL}/empresas`, empresa)  //envia el contenido del form al backend (web api)
    .pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public editar(id: number, empresa: CrearEmpresaDTO){
    console.log(id);
    return this.http.put(`${this.apiURL}/empresas/${id}`, empresa).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public eliminarPorId(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/empresas/${id}`).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public obtenerEmpresaPorId(id: number):Observable<any>{
    return this.http.get<EmpresaDTO>(`${this.apiURL}/empresas/${id}`);
  }
  //observables
  get refresh$(){
    return this._refresh$;
  }
}
