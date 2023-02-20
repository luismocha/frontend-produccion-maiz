import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearIntermediarioProduccionDTO, IntermediarioProduccionDTO, LitarIntermediariosProduccionDTO } from '../intermediario-produccion/intermediario-produccion.model';
import { ProductorDTO } from '../productores/productor.model';

@Injectable({
  providedIn: 'root'
})
export class IntermediarioProduccionService {
  private apiURL=environment.apiURL+'/api';
  private _refresh$ = new Subject<void>();
  //private _seleccionarProduccion$=new Subject<ProductorDTO>();
  constructor(public http: HttpClient) { }

  token: any = localStorage.getItem('token');

  httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization':`Token ${this.token}`
   })
 };


  public obtenerTodos():Observable<any>{
    return this.http.get<LitarIntermediariosProduccionDTO[]>(`${this.apiURL}/intermediarios-producciones`);
  }

  public crear(intermediario: CrearIntermediarioProduccionDTO):Observable<any> {
    return this.http.post<CrearIntermediarioProduccionDTO>(`${this.apiURL}/intermediarios-producciones/`, intermediario, this.httpOptions)  //envia el contenido del form al backend (web api)
    .pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public editar(id: number, empresa: CrearIntermediarioProduccionDTO){
    console.log(id);
    return this.http.put(`${this.apiURL}/intermediarios-producciones/${id}`, empresa, this.httpOptions).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public eliminarPorId(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/intermediarios-producciones/${id}`).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public obtenerIntermediarioProduccionPorId(id: number):Observable<any>{
    return this.http.get<IntermediarioProduccionDTO>(`${this.apiURL}/intermediarios-producciones/${id}`);
  }
  //observables
  get refresh$(){
    return this._refresh$;
  }
/*   get produccionSeleccionado$(){
    return this._seleccionarProduccion$;
  }
  public productorSeleccionado(productor:ProductorDTO):Observable<any>{
    return of(productor).pipe(
        tap(()=>{
            this._seleccionarProduccion$.next(productor);
        })
    )
  }  */
}
