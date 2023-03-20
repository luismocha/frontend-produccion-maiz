import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PublicacionesCompletoDTO } from '../publicaciones/publicaciones';
@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
    private apiURL=environment.apiURL+'/api';
    token: any = localStorage.getItem('token');
    private _refresh$ = new Subject<void>();
  constructor(public http: HttpClient) { }


  public crear(publicacion: FormData) {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.token}`
        });
        return this.http.post<any>(`${this.apiURL}/publicaciones/`, publicacion,{ headers })  //envia el contenido del form al backend (web api)
        .pipe(
        tap(() => {
            this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
        })
        );
    }
    public descargarPDF(id:number):Observable<any>{
        const headers = new HttpHeaders({
            'Content-Type': 'multipart/form-data',
            'Accept': '*/*'
        });
        return this.http.get(`${this.apiURL}/descargar-pdf/${id}`,
        { headers, observe: 'response', responseType: 'blob' }
        );
    }
    public obtenerTodos():Observable<any>{
        return this.http.get<PublicacionesCompletoDTO[]>(`${this.apiURL}/publicaciones/`);
    }
    public obtenerGaleriaPorId(id: number):Observable<any>{
        return this.http.get<PublicacionesCompletoDTO>(`${this.apiURL}/publicaciones/${id}`);
      }
    public editar(id: number, editarGaleria: any){
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.token}`
            });
        return this.http.put(`${this.apiURL}/publicaciones/${id}`, editarGaleria, { headers }).pipe(
            tap(() => {
            this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
            })
        );
    }
    public eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiURL}/publicaciones/${id}`).pipe(
          tap(() => {
            this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
          })
        );
    }
    //observables
    get refresh$(){
        return this._refresh$;
    }
}
